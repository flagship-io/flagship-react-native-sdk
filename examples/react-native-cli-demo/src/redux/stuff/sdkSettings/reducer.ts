import {
  SDK_SETTINGS_SET_ENV_ID,
  SDK_SETTINGS_SET_VISITOR_ID,
  SDK_SETTINGS_SET_VISITOR_CONTEXT,
  SDK_SETTINGS_SET_FS_MODIFICATIONS,
} from './../../glossary';
import initialState from './initialState';
import {SdkSettingsState, SdkSettingsAction} from './types';

const sdkSettingsReducer = (
  state: SdkSettingsState = initialState,
  action: SdkSettingsAction,
): SdkSettingsState => {
  switch (action.type) {
    case SDK_SETTINGS_SET_ENV_ID:
      return {...state, envId: action.payload};

    case SDK_SETTINGS_SET_VISITOR_ID:
      return {...state, visitorId: action.payload};
    case SDK_SETTINGS_SET_VISITOR_CONTEXT:
      return {...state, visitorContext: [...action.payload]};
    case SDK_SETTINGS_SET_FS_MODIFICATIONS:
      return {...state, fsModifications: action.payload};

    default:
      return state;
  }
};

export default sdkSettingsReducer;
