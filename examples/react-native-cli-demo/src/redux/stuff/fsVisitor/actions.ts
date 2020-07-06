import {IFlagshipVisitor} from '@flagship.io/js-sdk';

import {FS_VISITOR_UPDATE} from './../../glossary';
import {UpdateFsVisitor} from './types';

export const updateFsVisitor = (
  fsVisitor: IFlagshipVisitor,
): UpdateFsVisitor => {
  return {
    type: FS_VISITOR_UPDATE,
    payload: fsVisitor,
  };
};
