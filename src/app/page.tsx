"use client";
import React, { useState } from "react";
import { useGameStore } from "../store/gameStore";
import PlayerPanel from "../components/PlayerPanel/PlayerPanel";
import SettingsMenu from "../components/SettingsMenu/SettingsMenu";
import styles from "./page.module.css";
import { useWakeLock } from "@/hooks/useWakeLock";

const Home: React.FC = () => {
  const { players, playerCount } = useGameStore();
  const layoutClass =
    playerCount === 2 ? styles["two-players"] : styles["four-players"];
  const [showSettings, setShowSettings] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useWakeLock();

  const openPanel = () => {
    setIsExpanded(true);
    setIsClosing(false);
  };

  const closePanel = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsClosing(false);
    }, 250);
  };

  const shouldRotate = (id: number, count: number) => {
    if (count === 4) return id === 1 || id === 2;
    if (count === 2) return id === 1;
    return false;
  };

  return (
    <div className={`${styles.container} ${layoutClass}`}>
      <div className={styles.board}>
        {players.slice(0, playerCount).map((p) => (
          <PlayerPanel
            key={p.id}
            playerId={p.id}
            rotated={shouldRotate(p.id, playerCount)}
          />
        ))}
      </div>

      <button className={styles.settingsButton} onClick={openPanel}>
        Open
      </button>

      {isExpanded && (
        <div
          className={`${styles.panel} ${
            isClosing ? styles.shrink : styles.grow
          }`}
        >
          <button
            className={styles.closing}
            onClick={closePanel}
            aria-label="Close settings"
          >
            X
          </button>
          <button
            className={styles.settings}
            onClick={() => setShowSettings(true)}
          >
            Settings
          </button>
        </div>
      )}

      {showSettings && <SettingsMenu onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default Home;
