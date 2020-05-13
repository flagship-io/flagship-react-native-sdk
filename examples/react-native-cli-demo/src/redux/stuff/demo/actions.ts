import {
  DEMO_SET_USE_MODIFICATIONS_PARAMS,
  DEMO_SET_CURRENT_HIT_SELECTED,
  DEMO_UPDATE_HIT_PAYLOAD,
  DEMO_TOGGLE_SAFE_MODE,
  DEMO_RESET,
} from './../../glossary';
import {Modification, HitShape} from './types';

export const setModificationsParams = (
  requestedModifications: Modification[],
): {type: string; payload: Modification[]} => {
  return {
    type: DEMO_SET_USE_MODIFICATIONS_PARAMS,
    payload: requestedModifications,
  };
};

export const setCurrentHitSelected = (
  hitName: string,
): {type: string; payload: string} => {
  return {
    type: DEMO_SET_CURRENT_HIT_SELECTED,
    payload: hitName,
  };
};

export const toggleSafeMode = (
  value: boolean,
): {type: string; payload: boolean} => {
  return {
    type: DEMO_TOGGLE_SAFE_MODE,
    payload: value,
  };
};

export const updateHitPayload = (
  payload: HitShape,
): {type: string; payload: HitShape} => {
  return {
    type: DEMO_UPDATE_HIT_PAYLOAD,
    payload,
  };
};

export const resetDemo = (): {type: string} => {
  return {
    type: DEMO_RESET,
  };
};
