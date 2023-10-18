import BigNumber from 'bignumber.js';

export class LunarPayEventTopics {
  eventName: string;

  constructor(rawTopics: string[]) {
    this.eventName = Buffer.from(rawTopics[0], 'base64').toString();
  }

  protected parseIntValue(topic: any, fallback: any = 0) {
    if(!topic || topic === '') return fallback;
    
    return parseInt(Buffer.from(topic, 'base64').toString('hex'), 16);
  }

  protected parseBigUintValue(topic: any, fallback: any = undefined) {
    if(!topic || topic === '') return fallback;

    return new BigNumber(Buffer.from(topic, 'base64').toString('hex'), 16).toString();
  }

  toJSON() {
    return {
      eventName: this.eventName,
    };
  }
}
