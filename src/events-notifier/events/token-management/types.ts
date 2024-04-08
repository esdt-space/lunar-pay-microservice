import { GenericToken } from "@/libs/blockchain/mvx/event-decoder";
import { Address } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

export type TransferParseEvent = {
  sender: string;
  receiver: string;
  token_identifier: string;
  token_nonce: BigNumber;
  amount: string;
  is_internal: boolean;
}

export type TransferParsedEventResult = {
  sender: string;
  receiver: string;
  eventName: string;
  isInternal: boolean;
  token: GenericToken;
}

export type DepositWithdrawParseEvent = {
  address: Address;
  token_identifier: string;
  token_nonce: BigNumber;
  amount: string;
}

export type DepositWithdrawParsedEventResult = {
  address: string;
  eventName: string;
  token: GenericToken;
}
