import { LunarPayEventTopics } from '@/events-notifier/events/lunar-pay-event.topics';
import { TransactionEvent, TransactionEventTopic } from '@multiversx/sdk-network-providers/out';
import { ResultsParser } from '@multiversx/sdk-core/out';
import abiRegistry from '../../../../common/protocol/abi/lunar-pay.abi.json';

export class TriggerAgreementEventTopics extends LunarPayEventTopics {
  private readonly agreementId: number;
  private readonly accounts: string[];
  private readonly cycles: number[];
  private readonly amounts: number[];

  constructor(rawTopics: string[]) {
    super(rawTopics);

    const parser = new ResultsParser();
    // const eventDefinition = abiRegistry.events.filter((el) => el.identifier === 'triggerAgreement');

    const event = new TransactionEvent({
        identifier: "triggerAgreement",
        topics: [
            new TransactionEventTopic(rawTopics[1]),
            new TransactionEventTopic(rawTopics[2]),
            new TransactionEventTopic(rawTopics[3]),
            new TransactionEventTopic(rawTopics[4]),
        ],
    });

    const bundle = parser.parseUntypedOutcome(event as any)
    // const bundle = parser.parseEvent(event, eventDefinition.pop());
    console.log('logging out result',bundle)

    this.agreementId = this.parseIntValue(rawTopics[1]);
    this.accounts = Buffer.from(rawTopics[2], 'base64').toString().split(',')
    this.amounts = Buffer.from(rawTopics[3], 'base64').toString().split(',').map((item) => Number(item))
    this.cycles = Buffer.from(rawTopics[4], 'base64').toString().split(',').map((item) => Number(item))
  }

  toPlainObject() {
    return {
      agreementId: this.agreementId,
      accounts: this.accounts,
      cycles: this.cycles,
      amounts: this.amounts,
    };
  }
}
