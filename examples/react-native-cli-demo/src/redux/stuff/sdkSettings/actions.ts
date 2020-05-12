import {
  SDK_SETTINGS_SET_VISITOR_ID,
  SDK_SETTINGS_SET_ENV_ID,
  SDK_SETTINGS_SET_VISITOR_CONTEXT,
  SDK_SETTINGS_SET_FS_MODIFICATIONS,
  SDK_SETTINGS_RESET,
} from './../../glossary';
import {
  SetEnvIdAction,
  SetVisitorIdAction,
  visitorContextElement,
  SetVisitorContextAction,
  SetFsModificationsAction,
} from './types';

export const setEnvIdAction = (id: string): SetEnvIdAction => {
  return {
    type: SDK_SETTINGS_SET_ENV_ID,
    payload: id,
  };
};

export const setVisitorIdAction = (id: string): SetVisitorIdAction => {
  return {
    type: SDK_SETTINGS_SET_VISITOR_ID,
    payload: id,
  };
};

export const resetSettings = () => {
  return {
    type: SDK_SETTINGS_RESET,
  };
};

export const setFsModifications = (
  fsModifications: Array<any>,
): SetFsModificationsAction => {
  return {
    type: SDK_SETTINGS_SET_FS_MODIFICATIONS,
    payload: fsModifications,
  };
};

export const setVisitorContextAction = (
  context: Array<visitorContextElement>,
): SetVisitorContextAction => {
  return {
    type: SDK_SETTINGS_SET_VISITOR_CONTEXT,
    payload: context,
  };
};
