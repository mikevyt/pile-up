import {
  GameState,
  MoveCardStackToExistingCenterPileAction,
} from "../gameTypes";
import { isEqual } from "../../../types/PlayingCard";

export const moveCardStackToExistingCenterPileReducer = (
  state: GameState,
  action: MoveCardStackToExistingCenterPileAction
) => {
  const { id, startingCard, destinationCard } = action;
  const center = state.center.map((row) => [...row]);
  for (let i = 0; i < center.length; i++) {
    if (isEqual(center[i][center[i].length - 1], destinationCard)) {
      center[i].push({ ...startingCard, location: "center" });
      break;
    }
  }
  const stack: GameState["stack"] = {
    ...state.stack,
    [id]: state.stack[id].filter((card) => !isEqual(card, startingCard)),
  };

  return { ...state, center, stack };
};
