import { DonationParsedEventResult } from "@/events-notifier/events/donation";
import { PaymentParsedEventResult } from "@/events-notifier/events/payment";
import { SignedAgreementParsedEventResult, TriggerAgreementParsedEventResult } from "@/events-notifier/events/payment-agreement";
import { SignSubscriptionParsedEventResult, TriggerSubscriptionParsedEventResult } from "@/events-notifier/events/subscription";
import { DepositWithdrawParsedEventResult, TransferParsedEventResult } from "@/events-notifier/events/token-management";

export enum TRANSACTION_EVENTS {
  ESDT_NFT_Transfer = 'ESDTNFTTransfer',
  ESDT_NFT_Burn = 'ESDTNFTBurn',
  ESDT_NFT_ADD_QUANTITY = 'ESDTNFTAddQuantity',
  ESDT_NFT_CREATE = 'ESDTNFTCreate',
  MULTI_ESDT_NFT_TRANSFER = 'MultiESDTNFTTransfer',
  ESDT_TRANSFER = 'ESDTTransfer',
  ESDT_BURN = 'ESDTBurn',
  ESDT_LOCAL_MINT = 'ESDTLocalMint',
  ESDT_LOCAL_BURN = 'ESDTLocalBurn',
  ESDT_WIPE = 'ESDTWipe',
  ESDT_FREEZE = 'ESDTFreeze',
  TRANSFER_VALUE_ONLY = 'transferValueOnly',
  WRITE_LOG = 'writeLog',
  SIGNAL_ERROR = 'signalError',
  COMPLETE_TX = 'completedTxEvent',
}

export type RawEventType = {
  address: string | undefined;
  identifier: string | undefined;
  name?: string | undefined;
  topics?: string[];
  data?: string | undefined;
};

export type GenericEventType = {
  address: string | undefined;
  identifier: string | undefined;
  caller: string | undefined;
  block: number | undefined;
  epoch: number | undefined;
  timestamp: number | undefined;
};

export type GenericParsedEventType = 
  DonationParsedEventResult | 
  PaymentParsedEventResult | 
  TriggerSubscriptionParsedEventResult |
  TransferParsedEventResult |
  DepositWithdrawParsedEventResult |
  TriggerAgreementParsedEventResult |
  SignSubscriptionParsedEventResult |
  SignedAgreementParsedEventResult;
