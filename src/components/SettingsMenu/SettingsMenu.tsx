import React from "react";
import { useGameStore } from "../../store/gameStore";
import styles from "./SettingsMenu.module.css";

interface Props {
    onClose: () => void;
}

const SettingsMenu: React.FC<Props> = ({ onClose }) => {
    const { playerCount, setPlayerCount } = useGameStore();

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h3>Game Settings</h3>

                <div className={styles.option}>
                    <label>Players:</label>
                    <button
                        className={playerCount === 2 ? styles.active : ""}
                        onClick={() => setPlayerCount(2)}
                    >
                        2 Players
                    </button>
                    <button
                        className={playerCount === 4 ? styles.active : ""}
                        onClick={() => setPlayerCount(4)}
                    >
                        4 Players
                    </button>
                </div>

                <button className={styles.closeButton} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default SettingsMenu;
