"use client"
import React, { useState } from "react";
import { useGameStore } from "../store/gameStore";
import PlayerPanel from "../components/PlayerPanel/PlayerPanel";
import SettingsMenu from "../components/SettingsMenu/SettingsMenu";
import styles from "./page.module.css";

const Home: React.FC = () => {
  const { players, playerCount } = useGameStore();
  const layoutClass = playerCount === 2 ? styles['two-players'] : styles['four-players'];
  const [showSettings, setShowSettings] = useState(false);


  return (
    <div className={`${styles.container} ${layoutClass}`}>
      <div className={styles.board}>
        {players.slice(0, playerCount).map((p) => (
          <PlayerPanel key={p.id} playerId={p.id} />
        ))}
      </div>

      <button className={styles.settingsButton} onClick={() => setShowSettings(true)}>
        x
      </button>

      {showSettings && <SettingsMenu onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default Home;
