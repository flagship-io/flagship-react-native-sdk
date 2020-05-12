import {
  DEMO_UPDATE_HIT_PAYLOAD,
  DEMO_SET_CURRENT_HIT_SELECTED,
  DEMO_SET_USE_MODIFICATIONS_PARAMS,
  DEMO_RESET,
} from './../../glossary';
import initialState from './initialState';
import {DemoState} from './types';

const demoReducer = (
  state: DemoState = initialState,
  action: {type: string; payload: any},
): DemoState => {
  let newState = {...state};
  switch (action.type) {
    case DEMO_UPDATE_HIT_PAYLOAD:
      if (newState.sendHit.selected) {
        return {
          ...state,
          sendHit: {
            ...state.sendHit,
            [newState.sendHit.selected]: action.payload,
          },
        };
      }
      return {...state};
    case DEMO_SET_CURRENT_HIT_SELECTED:
      return {
        ...state,
        sendHit: {
          ...state.sendHit,
          selected: action.payload,
        },
      };
    case DEMO_SET_USE_MODIFICATIONS_PARAMS:
      newState.getModifications.params = action.payload;
      return newState;
    case DEMO_RESET:
      return {...initialState};
    default:
      return state;
  }
};

export default demoReducer;
