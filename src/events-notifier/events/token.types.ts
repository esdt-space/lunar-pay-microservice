import {
  GenericEventType,
  GenericTokenType,
} from '@/libs/blockchain/mvx/event-decoder';

export type TransactionEventTypes = GenericEventType & {
  address: string;
  token: GenericTokenType;
};

export type TransferEventTypes = GenericEventType & {
  sender: string;
  receiver: string;
  isInternal: boolean;
  token: GenericTokenType;
};
