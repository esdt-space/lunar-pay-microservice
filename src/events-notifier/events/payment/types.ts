import { Token } from "@/libs/blockchain/mvx/models";
import { Address, OptionValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

export type PaymentParsedResult = {
  sender: Address,
  receiver: Address,
  token_identifier: Token,
  token_nonce: number,
  amount: BigNumber,
  metadata: OptionValue,
}

export type PaymentResult = {
  sender: Address;
  receiver: Address;
  tokenIdentifier: Token;
  tokenNonce: number;
  amount: number;
  metadata: string;
}
