import { GetSignedAgreementDto } from "../dto/get-signed-agreement.dto";
import { PaymentAgreement } from "../payment-agreement.schema";

export const signedAgreementsEntityToDto = (agreementsList: PaymentAgreement[]): GetSignedAgreementDto[] => {
  return agreementsList.map((el) => {
    return {
      id: el._id,
      ownerName: el.ownerName,
      itemName: el.itemName,
      tokenIdentifier: el.tokenIdentifier,
      benefits: el.benefits,
      content: el.content,
      description: el.description,
      frequency: el.frequency,
      accountsCount: el.accountsCount,
      fixedAmount: el.fixedAmount,
      createdAt: el.createdAt
    }
  })
}
