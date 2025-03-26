import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useGameStore } from "@store/gameStore";
import userEvent from "@testing-library/user-event";

import Home from "./page";

describe("GameBoard Component", () => {
    it("should render the correct number of players for a regular commander game", () => {
        useGameStore.getState().setPlayerCount(4);
        render(<Home />);
        expect(screen.getAllByText("40")).toHaveLength(4);
    });

    it("should render the correct number of players for an one on one game", () => {
        useGameStore.getState().setPlayerCount(2);
        render(<Home />);
        expect(screen.getAllByText("20")).toHaveLength(2);
    });

    it("should increase and decrease life when buttons are clicked", async () => {
        const user = userEvent.setup();
        useGameStore.getState().setPlayerCount(4);
        render(<Home />);

        const playerLife = screen.getAllByText("40")[0];
        const increaseButton = screen.getAllByRole("button", { name: "+" })[0];
        const decreaseButton = screen.getAllByRole("button", { name: "-" })[0];

        await user.click(increaseButton);
        expect(playerLife.textContent).toContain("41");

        await user.click(decreaseButton);
        expect(playerLife.textContent).toContain("40");
    });

    it("should open the settings menu and change player count", async () => {
        const user = userEvent.setup();
        render(<Home />);

        await user.click(screen.getByRole("button", { name: "x" }));

        const twoPlayerButton = screen.getByText("2 Players");
        await user.click(twoPlayerButton);

        expect(useGameStore.getState().playerCount).toBe(2);
    });
});
