export type SdkSettingsState = {
  envId: string | undefined;
  visitorId: string | undefined;
  visitorContext: Array<visitorContextElement>;
  config: any;
  fsModifications: any[];
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
