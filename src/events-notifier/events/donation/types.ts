import { Token } from "@/libs/blockchain/mvx/models";
import { Address, OptionValue } from "@multiversx/sdk-core/out";
import BigNumber from "bignumber.js";

export type DonationParsedResult = {
  sender: Address,
  receiver: Address,
  token_identifier: Token,
  token_nonce: number,
  amount: BigNumber,
  donation_id: Uint8Array ,
  metadata: OptionValue,
}

export type DonationResult = {
  sender: Address;
  receiver: Address;
  tokenIdentifier: Token;
  tokenNonce: number;
  amount: number;
  donationId: string;
  metadata: string;
}
