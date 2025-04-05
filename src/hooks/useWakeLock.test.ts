import { vi } from "vitest";
import { useWakeLock } from "./useWakeLock";
import { renderHook } from "@testing-library/react";

describe("useWakeLock", () => {
  let requestMock: ReturnType<typeof vi.fn>;
  let releaseMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    releaseMock = vi.fn();
    requestMock = vi.fn().mockResolvedValue({
      release: releaseMock,
      addEventListener: vi.fn(),
    });

    Object.defineProperty(window.navigator, "wakeLock", {
      writable: true,
      value: {
        request: requestMock,
      },
    });
  });

  it("requests wake lock on mount", () => {
    renderHook(() => useWakeLock());
    expect(requestMock).toHaveBeenCalledWith("screen");
  });

  it("releases wake lock on unmount", async () => {
    const { unmount } = renderHook(() => useWakeLock());

    // Wait microtask queue to allow async hook to finish
    await Promise.resolve();

    unmount();
    expect(releaseMock).toHaveBeenCalled();
  });

  it("does not throw if wakeLock is not available", () => {
    const originalNavigator = window.navigator;

    Object.defineProperty(window, "navigator", {
      value: {},
      configurable: true,
    });

    expect(() => renderHook(() => useWakeLock())).not.toThrow();

    // Restore original navigator
    Object.defineProperty(window, "navigator", {
      value: originalNavigator,
    });
  });
});
