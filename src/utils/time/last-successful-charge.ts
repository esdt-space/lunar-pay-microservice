type EventData = {
  agreementId: number;
  accounts: string[];
  cycles: number[];
  amounts: number[];
}

export const calculateLastSuccessfulCharge = (index: number, frequency: number, eventData: EventData) => {
  return new Date(new Date().getTime() - Number(eventData.cycles[index]) * frequency * 1000)
}
