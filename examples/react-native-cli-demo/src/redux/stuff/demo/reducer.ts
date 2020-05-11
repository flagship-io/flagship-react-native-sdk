import {
  DEMO_UPDATE_HIT_PAYLOAD,
  DEMO_SET_CURRENT_HIT_SELECTED,
  DEMO_SET_USE_MODIFICATIONS_PARAMS,
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
        newState[newState.sendHit.selected] = action.payload;
      }
      return newState;
    case DEMO_SET_CURRENT_HIT_SELECTED:
      newState.sendHit.selected = action.payload;
      return newState;
    case DEMO_SET_USE_MODIFICATIONS_PARAMS:
      newState.getModifications.params = action.payload;
      return newState;
    default:
      return state;
  }
};

export default demoReducer;
