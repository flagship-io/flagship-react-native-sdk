import transaction from './transaction';
import screen from './screen';
import event from './event';
import item from './item';
import {
  TransactionHit,
  ScreenHit,
  ItemHit,
  EventHit,
} from '@flagship.io/react-native-sdk';

const hit: {
  transaction: TransactionHit;
  screen: ScreenHit;
  item: ItemHit;
  event: EventHit;
} = {
  transaction: transaction as TransactionHit,
  screen: screen as ScreenHit,
  item: item as ItemHit,
  event: event as EventHit,
};

export default hit;
