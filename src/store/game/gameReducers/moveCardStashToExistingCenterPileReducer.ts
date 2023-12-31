import {
  GameState,
  MoveCardStashToExistingCenterPileAction,
} from "../gameTypes";
import { isEqual } from "../../../types/PlayingCard";

export const moveCardStashToExistingCenterPileReducer = (
  state: GameState,
  action: MoveCardStashToExistingCenterPileAction
) => {
  const { id, startingCard, destinationCard } = action;
  const center = state.center.map((row) => [...row]);
  for (let i = 0; i < center.length; i++) {
    if (isEqual(center[i][center[i].length - 1], destinationCard)) {
      center[i].push({ ...startingCard, location: "center" });
      break;
    }
  }
  const stash: GameState["stash"] = {
    ...state.stash,
    [id]: state.stash[id].filter((card) => !isEqual(card, startingCard)),
  };

  return { ...state, center, stash };
};
