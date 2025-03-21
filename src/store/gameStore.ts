import { create } from "zustand";

interface CommanderDamage {
    [attackerId: number]: number;
}

type Player = {
    id: number;
    life: number;
    poison: number;
    commanderDamage: CommanderDamage;
};

type GameState = {
    players: Player[];
    playerCount: number;
    setLife: (id: number, amount: number) => void;
    resetGame: (playerCount: number) => void;
    setCommanderDamage: (targetId: number, attackerId: number, amount: number) => void;
    setPlayerCount: (count: number) => void;
};

const defaultPlayers = (count: number): Player[] =>
    Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        life: count === 2 ? 20 : 40,
        poison: 0,
        commanderDamage: {},
    }));

export const useGameStore = create<GameState>((set) => ({
    players: defaultPlayers(4),
    playerCount: 4,
    setLife: (id, amount) =>
        set((state) => ({
            players: state.players.map((p) =>
                p.id === id ? { ...p, life: p.life + amount } : p
            ),
        })),
    resetGame: (playerCount) => set({ players: defaultPlayers(playerCount) }),
    setCommanderDamage: (targetId, attackerId, amount) =>
        set((state) => ({
            players: state.players.map((p) =>
                p.id === targetId
                    ? {
                        ...p,
                        commanderDamage: {
                            ...p.commanderDamage,
                            [attackerId]: (p.commanderDamage[attackerId] || 0) + amount,
                        },
                    }
                    : p
            ),
        })),
    setPlayerCount: (count) =>
        set((state) => {
            if (state.playerCount !== count) {
                const newLife = count === 2 ? 20 : 40;

                const updatedPlayers = Array.from({ length: 4 }, (_, i) => ({
                    id: i + 1,
                    life: newLife, // Always reset life when switching player count
                    poison: 0,
                    commanderDamage: {},
                }));

                return {
                    playerCount: count,
                    players: updatedPlayers.slice(0, count),
                };
            }
            return {};
        }),
}));
