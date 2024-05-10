import BigNumber from 'bignumber.js';
import { Address } from '@multiversx/sdk-core/out';

import { GenericToken } from '@/libs/blockchain/mvx/event-decoder';
import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { LunarPayEventParser } from '@/libs/blockchain/mvx/event-decoder/generic.event-parser';
import { CreateSubscriptionParsedEvent } from '..';

export class CreateSubscriptionEventTopics extends LunarPayEventTopics {
  private readonly subscriptionId: number;
  private readonly frequency: number;
  private readonly unixTimestamp: number;
  private readonly subscriptionType: number;
  private readonly amountType: number;

  private readonly address: Address;
  private readonly tokenNonce: number;
  private readonly tokenIdentifier: string;

  private readonly fixedAmount: string | undefined;

  constructor(rawTopics: string[]) {
    super(rawTopics);
    
    const eventParser = new LunarPayEventParser<CreateSubscriptionParsedEvent>();
    const parsedEvent = eventParser.parse(rawTopics, this.eventName);

    this.subscriptionId = parsedEvent.id.toNumber();
    this.address = new Address(parsedEvent.owner);
    this.tokenNonce = parsedEvent.token_nonce.toNumber();
    this.tokenIdentifier = parsedEvent.token_identifier.toString();
    this.frequency = parsedEvent.frequency.toNumber();
    this.unixTimestamp = parsedEvent.time_created.toNumber();
    this.subscriptionType = parsedEvent.subscription_type;
    this.amountType = parsedEvent.amount_type;
    this.fixedAmount = parsedEvent.amount.toString();
  }

  toPlainObject() {
    return {
      eventName: this.eventName,
      subscriptionId: this.subscriptionId,
      address: this.address.bech32(),
      frequency: this.frequency,
      timeCreated: this.unixTimestamp,
      subscriptionType: this.subscriptionType,
      amountType: this.amountType,
      fixedAmount: this.fixedAmount,
      token: new GenericToken({
        tokenIdentifier: this.tokenIdentifier,
        nonce: new BigNumber(this.tokenNonce),
      }),
    };
  }
}
