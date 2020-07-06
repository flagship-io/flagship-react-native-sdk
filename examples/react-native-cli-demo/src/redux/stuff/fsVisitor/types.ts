import {
  IFlagshipVisitor,
  FlagshipVisitorContext,
  DecisionApiCampaign,
} from '@flagship.io/js-sdk';

export type UpdateFsVisitor = {
  type: string;
  payload: IFlagshipVisitor;
};

export type FsVisitorState = {
  id?: string;
  envId?: string;
  context?: FlagshipVisitorContext;
  isAllModificationsFetched?: boolean;
  bucket?: any | null;
  fetchedModifications?: DecisionApiCampaign[] | null;
};

export type FsVisitorAction = UpdateFsVisitor;
