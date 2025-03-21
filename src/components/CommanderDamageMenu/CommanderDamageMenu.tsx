import React from "react";
import { useGameStore } from "../../store/gameStore";
import styles from "./CommanderDamageMenu.module.css";

interface Props {
    playerId: number;
    onClose: () => void;
}

const CommanderDamageMenu: React.FC<Props> = ({ playerId, onClose }) => {
    const { players, setCommanderDamage } = useGameStore();
    const currentPlayer = players.find((p) => p.id === playerId);

    if (!currentPlayer) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h3>Commander Damage</h3>
                {players
                    .filter((p) => p.id !== playerId) // Exclude the current player
                    .map((opponent) => (
                        <div key={opponent.id} className={styles.damageRow}>
                            <span>From Player {opponent.id}:</span>
                            <button onClick={() => setCommanderDamage(playerId, opponent.id, -1)}>-</button>
                            <span>{currentPlayer.commanderDamage[opponent.id] || 0}</span>
                            <button onClick={() => setCommanderDamage(playerId, opponent.id, 1)}>+</button>
                        </div>
                    ))}
                <button className={styles.closeButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CommanderDamageMenu;
