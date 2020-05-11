import {
  TransactionHit,
  ScreenHit,
  ItemHit,
  EventHit,
} from '@flagship.io/react-native-sdk';

export type Modification = {
  key: string;
  defaultValue: any;
  activate: boolean;
};

export type HitShape = TransactionHit | ScreenHit | ItemHit | EventHit;

export type DemoState = {
  getModifications: {
    params: Modification[];
  };
  sendHit: {
    transaction: TransactionHit;
    screen: ScreenHit;
    item: ItemHit;
    event: EventHit;
    selected: string;
  };
};
