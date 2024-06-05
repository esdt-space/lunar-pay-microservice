import { SubscriptionMultiChargeResult } from "../types"

export const parseTriggerSubscriptionData = (eventData: SubscriptionMultiChargeResult[]) => {
  return eventData.reduce((acc, val) => {
    const successfulValue = val.data['field0'];
    const failedValue = val.data['field1'];

    if(successfulValue !== null) {
      acc.successfulChargeAmount = successfulValue['field0'].toString()
      acc.successfulCycles = Number(successfulValue['field1'].toString())
    }

    if(failedValue !== null) {
      acc.failedChargeAmount = failedValue['field0'].toString()
      acc.failedCycles =Number(failedValue['field1'].toString())
    }

    return acc
  }, {
    successfulChargeAmount: "", 
    failedChargeAmount: "", 
    successfulCycles: 0, 
    failedCycles: 0
  })
}
