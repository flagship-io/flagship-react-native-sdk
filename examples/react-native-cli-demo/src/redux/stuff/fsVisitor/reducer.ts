import {FS_VISITOR_UPDATE} from './../../glossary';
import {FsVisitorState, FsVisitorAction} from './types';
import initialState from './initialState';

const FsVisitorReducer = (
  state: FsVisitorState = initialState,
  action: FsVisitorAction,
): FsVisitorState => {
  switch (action.type) {
    case FS_VISITOR_UPDATE:
      return {
        envId: action.payload.envId,
        id: action.payload.id,
        context: action.payload.context,
        isAllModificationsFetched: action.payload.isAllModificationsFetched,
        bucket: action.payload.bucket,
        fetchedModifications: action.payload.fetchedModifications,
      };

    default:
      return state;
  }
};

export default FsVisitorReducer;
