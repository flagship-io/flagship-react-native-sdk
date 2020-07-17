import {FsVisitorState} from './types';

const initialState: FsVisitorState = {
  envId: null,
  id: null,
  context: null,
  isAllModificationsFetched: null,
  bucket: {
    data: null,
    computedData: null,
    envId: null,
    visitorId: null,
    visitorContext: null,
  },
  fetchedModifications: null,
};

export default initialState;
