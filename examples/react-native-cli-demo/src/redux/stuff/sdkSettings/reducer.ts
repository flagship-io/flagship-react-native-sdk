import {
  SDK_SETTINGS_SET_ENV_ID,
  SDK_SETTINGS_SET_VISITOR_ID,
  SDK_SETTINGS_SET_VISITOR_CONTEXT,
  SDK_SETTINGS_RESET,
  SDK_SETTINGS_UPDATE_CONFIG,
} from './../../glossary';
import initialState from './initialState';
import {SdkSettingsState, SdkSettingsAction} from './types';

const sdkSettingsReducer = (
  state: SdkSettingsState = {...initialState},
  action: SdkSettingsAction,
): SdkSettingsState => {
  switch (action.type) {
    case SDK_SETTINGS_SET_ENV_ID:
      return {...state, envId: action.payload as string};
    case SDK_SETTINGS_SET_VISITOR_ID:
      return {...state, visitorId: action.payload as any};
    case SDK_SETTINGS_SET_VISITOR_CONTEXT:
      return {...state, visitorContext: [...action.payload]};
    case SDK_SETTINGS_RESET:
      return JSON.parse(JSON.stringify(initialState));
    case SDK_SETTINGS_UPDATE_CONFIG:
      return {
        ...state,
        ...(action.payload as any),
      };
    default:
      return state;
  }
};

export default sdkSettingsReducer;
