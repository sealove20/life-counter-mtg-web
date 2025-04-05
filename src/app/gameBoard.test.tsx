import { render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useGameStore } from "@store/gameStore";
import userEvent from "@testing-library/user-event";

import Home from "./page";

vi.mock("@/hooks/useWakeLock", () => ({
  useWakeLock: () => {},
}));

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

    const firstPlayerPanel = screen.getAllByText("40")[0];
    const increaseButton = screen.getAllByRole("button", {
      name: /increase life/i,
    })[0];
    const decreaseButton = screen.getAllByRole("button", {
      name: /decrease life/i,
    })[0];

    await user.click(increaseButton);

    await waitFor(() => {
      expect(within(firstPlayerPanel).getByText("41")).toBeInTheDocument();
    });

    await user.click(decreaseButton);

    await waitFor(() => {
      expect(within(firstPlayerPanel).getByText("40")).toBeInTheDocument();
    });
  });

  it("should open the settings menu and change player count", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const closeButton = screen.getByRole("button", { name: /close settings/i });

    await user.click(closeButton);

    const twoPlayerButton = screen.getByText("2 Players");
    await user.click(twoPlayerButton);

    expect(useGameStore.getState().playerCount).toBe(2);
  });
});
