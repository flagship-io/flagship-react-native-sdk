export type SdkSettingsState = {
  envId: string | undefined;
  visitorId: string | undefined;
  visitorContext: Array<visitorContextElement>;
  fetchNow: boolean;
  decisionMode: string;
  pollingInterval: number | null;
  activateNow: boolean;
  enableConsoleLogs: boolean;
  enableErrorLayout: boolean;
  nodeEnv: string;
  flagshipApi: string;
  apiKey: null | string;
};

export type SetEnvIdAction = {
  type: string;
  payload: string;
};

export type SetVisitorIdAction = {
  type: string;
  payload: string;
};

export type SetVisitorContextAction = {
  type: string;
  payload: Array<visitorContextElement>;
};

export type SetFsModificationsAction = {
  type: string;
  payload: Array<any>;
};

export type visitorContextElement = {
  key: string;
  value: string | number | boolean;
  type: string;
};

export type SdkSettingsAction =
  | SetEnvIdAction
  | SetVisitorIdAction
  | SetVisitorContextAction
  | SetFsModificationsAction;
