import { beforeEach, describe, expect, it } from "vitest";
import { useGameStore } from "@store/gameStore";

describe("Game Store", () => {
    beforeEach(() => {
        useGameStore.setState({
            playerCount: 4,
            players: Array.from({ length: 4 }, (_, i) => ({
                id: i + 1,
                life: 40,
                poison: 0,
                commanderDamage: {},
            })),
        });
    });

    it("should initialize with 4 players and 40 life", () => {
        const { players, playerCount } = useGameStore.getState();
        expect(playerCount).toBe(4);
        expect(players).toHaveLength(4);
        expect(players[0].life).toBe(40);
    });

    it("should update life when switching to 2 players", () => {
        useGameStore.getState().setPlayerCount(2);
        const { players, playerCount } = useGameStore.getState();

        expect(playerCount).toBe(2);
        expect(players).toHaveLength(2);
        expect(players[0].life).toBe(20);
        expect(players[1].life).toBe(20);
    });

    it("should reset life totals when switching back to 4 players", () => {
        useGameStore.getState().setPlayerCount(2);
        useGameStore.getState().setPlayerCount(4);
        const { players } = useGameStore.getState();

        expect(players).toHaveLength(4);
        expect(players[0].life).toBe(40);
        expect(players[1].life).toBe(40);
        expect(players[2].life).toBe(40);
        expect(players[3].life).toBe(40);
    });

    it("should correctly update poison counters", () => {
        useGameStore.setState((state) => ({
            players: state.players.map((player) =>
                player.id === 1 ? { ...player, poison: 5 } : player
            ),
        }));

        const { players } = useGameStore.getState();
        expect(players[0].poison).toBe(5);
    });
});
