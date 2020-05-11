import {AppState} from './types';
import {combineReducers} from 'redux';
import sdkSettingsReducer from './stuff/sdkSettings/reducer';
import demoReducer from './stuff/demo/reducer';

const rootReducer = combineReducers<AppState>({
  sdkSettings: sdkSettingsReducer,
  demo: demoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
