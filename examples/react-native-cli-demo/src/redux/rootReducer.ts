import {AppState} from './types';
import {combineReducers} from 'redux';
import sdkSettingsReducer from './stuff/sdkSettings/reducer';
import demoReducer from './stuff/demo/reducer';
import fsVisitorReducer from './stuff/fsVisitor/reducer';

const rootReducer = combineReducers<AppState>({
  sdkSettings: sdkSettingsReducer,
  demo: demoReducer,
  fsVisitor: fsVisitorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
