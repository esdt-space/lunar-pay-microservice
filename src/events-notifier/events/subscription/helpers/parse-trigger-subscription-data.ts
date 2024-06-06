import { SubscriptionMultiChargeResult } from "../types"

export const parseTriggerSubscriptionData = (eventData: SubscriptionMultiChargeResult[]) => {
  let successfulChargeAmount = 0
  let failedChargeAmount = 0
  let successfulCycles = 0
  let failedCycles = 0

  eventData.forEach((val) => {
    if(val.data['field0'] && val.data['field0']['field0']) {
      successfulChargeAmount += Number(val.data['field0']['field0'])
      successfulCycles += Number(val.data['field0']['field1'])
    }
    
    if(val.data['field1'] && val.data['field1']['field0']) {
      failedChargeAmount += Number(val.data['field1']['field0'])
      failedCycles += Number(val.data['field1']['field1'])
    }
  })

  return {
    successfulChargeAmount: successfulChargeAmount.toString(), 
    failedChargeAmount: failedChargeAmount.toString(), 
    successfulCycles: successfulCycles, 
    failedCycles: failedCycles
  }
}
