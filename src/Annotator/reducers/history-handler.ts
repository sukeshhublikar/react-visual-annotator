// @flow

import { Action, MainLayoutState } from "../../MainLayout/types";
import Immutable, { ImmutableObject } from "seamless-immutable";
import moment from "moment";
import { cloneDeep } from "lodash";

const typesToSaveWithHistory: Record<string, string> = {
  BEGIN_BOX_TRANSFORM: "Transform/Move Box",
  BEGIN_BOX_ROTATION: "Rotate Box",
  BEGIN_MOVE_POINT: "Move Point",
  DELETE_REGION: "Delete Region",
};

export const saveToHistory = <T extends ImmutableObject<MainLayoutState>>(
  state: T,
  name: string
) =>
  Immutable(state).updateIn(["history"], (h) => {
    // Create a clean copy of state without circular references
    const cleanState = cloneDeep(Immutable.asMutable(state.without("history") as any, { deep: true }));
    const newValue = {
      time: moment().toDate(),
      state: cleanState,
      name,
    };
    const prevItems = h || [];

    return [newValue, ...prevItems].slice(0, 9);
  });

export default (
  reducer: (
    state: ImmutableObject<MainLayoutState>,
    action: Action
  ) => ImmutableObject<MainLayoutState>
) => {
  return (state: ImmutableObject<MainLayoutState>, action: Action) => {
    const prevState = state;
    const nextState = reducer(state, action);

    if (action.type === "RESTORE_HISTORY") {
      if (state.history.length > 0) {
        try {
          const newState = Immutable(
            nextState.history[0].state
          ) as ImmutableObject<MainLayoutState>;
          return newState.setIn(["history"], nextState.history.slice(1));
        } catch (error) {
          console.warn("Error restoring history:", error);
          // Return current state if restore fails
          return nextState;
        }
      }
    } else {
      if (
        prevState !== nextState &&
        Object.keys(typesToSaveWithHistory).includes(action.type)
      ) {
        // Create a clean copy of state without circular references
        const cleanPrevState = cloneDeep(Immutable.asMutable(prevState.without("history") as any, { deep: true }));
        const historyItem = {
          time: moment().toDate(),
          state: cleanPrevState,
          name: typesToSaveWithHistory[action.type] || action.type,
        };
        const prevItems = nextState.history || [];
        const newValue = [historyItem, ...prevItems].slice(0, 9);
        const immutableNextState = Immutable(
          nextState
        ) as ImmutableObject<MainLayoutState>;
        return immutableNextState.setIn(["history"], newValue);
      }
    }

    return nextState;
  };
};
