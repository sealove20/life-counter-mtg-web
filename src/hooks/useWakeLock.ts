import { useEffect, useRef } from "react";

export function useWakeLock() {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          const navigatorWithWakeLock = navigator as Navigator & {
            wakeLock?: {
              request: (type: "screen") => Promise<WakeLockSentinel>;
            };
          };
          wakeLockRef.current = await navigatorWithWakeLock.wakeLock?.request(
            "screen"
          );
        }
      } catch (err) {
        console.error("Wake Lock failed:", err);
      }
    };

    requestWakeLock();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      wakeLockRef.current?.release();
      wakeLockRef.current = null;
    };
  }, []);
}
