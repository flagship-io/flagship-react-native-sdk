import {AppState} from './types';
import {combineReducers} from 'redux';
import sdkSettingsReducer from './stuff/sdkSettings/reducer';

const rootReducer = combineReducers<AppState>({
  sdkSettings: sdkSettingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
