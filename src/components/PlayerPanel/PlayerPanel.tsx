import React, { useState } from "react";
import { useGameStore } from "../../store/gameStore";
import styles from "./PlayerPanel.module.css";
import CommanderDamageMenu from "../CommanderDamageMenu/CommanderDamageMenu";

type Props = { playerId: number };

const PlayerPanel: React.FC<Props> = ({ playerId }) => {
  const { players, setLife } = useGameStore();
  const player = players.find((p) => p.id === playerId);
  const [showCommanderMenu, setShowCommanderMenu] = useState(false);

  if (!player) return null;

  const bgClass = (playerId: number) => {
    switch (playerId) {
      case 1:
        return styles["top-left"];
      case 2:
        return styles["top-right"];
      case 3:
        return styles["bottom-left"];
      case 4:
        return styles["bottom-right"];
      default:
        return "";
    }
  };

  const totalCommanderDamage = Object.values(player.commanderDamage).reduce(
    (sum, dmg) => sum + dmg,
    0
  );
  const effectiveLife = player.life - totalCommanderDamage;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const panel = event.currentTarget;
    const panelWidth = panel.offsetWidth;
    const clickX = event.nativeEvent.offsetX;

    // Determine if it's a left or right click
    const isLeft = clickX < panelWidth / 2;
    const effectClass = isLeft ? styles.leftClick : styles.rightClick;

    // Apply temporary effect class
    panel.classList.add(effectClass);
    setTimeout(() => {
      panel.classList.remove(effectClass);
    }, 200); // Remove effect after 200ms

    // Update life total
    setLife(player.id, isLeft ? -1 : 1);
  };

  return (
    <div
      className={`${styles.panel} ${bgClass(playerId)}`}
      onClick={handleClick}
    >
      <div className={styles["life-container"]}>
        <button className={styles.button} onClick={() => setLife(playerId, -1)}>
          -
        </button>
        <span
          className={styles.life}
          onClick={() => setShowCommanderMenu(true)}
        >
          {effectiveLife}
        </span>
        <button className={styles.button} onClick={() => setLife(playerId, 1)}>
          +
        </button>
      </div>

      {showCommanderMenu && (
        <CommanderDamageMenu
          playerId={playerId}
          onClose={() => setShowCommanderMenu(false)}
        />
      )}
    </div>
  );
};

export default PlayerPanel;
