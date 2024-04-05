import { GenericToken } from "@/libs/blockchain/mvx/event-decoder";

export type TransferParsedEventResult = {
  sender: string;
  receiver: string;
  eventName: string;
  isInternal: boolean;
  token: GenericToken;
}

export type DepositWithdrawParsedEventResult = {
  address: string;
  eventName: string;
  token: GenericToken;
}
