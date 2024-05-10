import { GenericToken } from "@/libs/blockchain/mvx/event-decoder";
import { Address } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

export type TransferParsedEvent = {
  sender: string;
  receiver: string;
  token_identifier: string;
  token_nonce: BigNumber;
  amount: string;
  is_internal: boolean;
}

export type TransferResult = {
  sender: string;
  receiver: string;
  eventName: string;
  isInternal: boolean;
  token: GenericToken;
}

export type DepositWithdrawParsedEvent = {
  address: Address;
  token_identifier: string;
  token_nonce: BigNumber;
  amount: string;
}

export type DepositWithdrawResult = {
  address: string;
  eventName: string;
  token: GenericToken;
}
