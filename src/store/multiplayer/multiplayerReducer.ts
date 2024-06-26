import { Reducer } from "redux";
import {
  AddEmojiAction,
  AddHostAction,
  AddNameAction,
  AddPreviousScoresAction,
  MultiplayerAction,
  MultiplayerActionType,
  MultiplayerState,
  UpdateAction,
} from "./multiplayerTypes";

export const initialState: MultiplayerState = {
  name: {},
  emoji: {},
  host: "",
  gameStatus: "NOT_STARTED",
  previousScore: {},
};

export const MultiplayerReducer: Reducer<
  MultiplayerState,
  MultiplayerAction
> = (state = initialState, action) => {
  switch (action.type) {
    case MultiplayerActionType.UPDATE:
      return updateReducer(state, action);
    case MultiplayerActionType.ADD_NAME:
      return addNameReducer(state, action);
    case MultiplayerActionType.ADD_EMOJI:
      return addEmojiReducer(state, action);
    case MultiplayerActionType.ADD_HOST:
      return addHostReducer(state, action);
    case MultiplayerActionType.ADD_PREVIOUS_SCORES:
      return addPreviousScoresReducer(state, action);
    case MultiplayerActionType.START_GAME:
      return startGameReducer(state);
    case MultiplayerActionType.END_ROUND:
      return endRoundReducer(state);
    case MultiplayerActionType.END_GAME:
      return endGameReducer(state);
    default:
      return state;
  }
};

export const updateReducer = (
  state: MultiplayerState,
  action: UpdateAction
) => {
  const { state: newState } = action;
  return { ...state, ...newState };
};

export const addNameReducer = (
  state: MultiplayerState,
  action: AddNameAction
) => {
  const { id, name } = action;
  return { ...state, name: { ...state.name, [id]: name } };
};

export const addEmojiReducer = (
  state: MultiplayerState,
  action: AddEmojiAction
) => {
  const { id, emoji } = action;
  return { ...state, emoji: { ...state.emoji, [id]: emoji } };
};

export const addHostReducer = (
  state: MultiplayerState,
  action: AddHostAction
) => {
  const { id } = action;
  return { ...state, host: id };
};

export const addPreviousScoresReducer = (
  state: MultiplayerState,
  action: AddPreviousScoresAction
) => {
  const { scores } = action;
  console.log({ scores });
  const previousScore = { ...state.previousScore };
  console.log({ previousScore });

  scores.forEach((value, key) => {
    previousScore[key] = [...(previousScore[key] || []), value || 0];
  });

  return { ...state, previousScore };
};

export const startGameReducer = (state: MultiplayerState): MultiplayerState => {
  return { ...state, gameStatus: "ROUND_STARTED" };
};

export const endRoundReducer = (state: MultiplayerState): MultiplayerState => {
  return { ...state, gameStatus: "ROUND_ENDED" };
};

export const endGameReducer = (state: MultiplayerState): MultiplayerState => {
  return { ...state, gameStatus: "ENDED" };
};
