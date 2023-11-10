import { GetProviderAgreementDto } from "../dto/get-provider-agreement.dto";
import { PaymentAgreement } from "../payment-agreement.schema";

export const providerAgreementsEntityToDto = (agreementsList: PaymentAgreement[]): GetProviderAgreementDto[] => {
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
      createdAt: el.createdAt,
      signAgreementRedirectUrl: el.signAgreementRedirectUrl,
      signAgreementHttpCallbackUrl: el.signAgreementHttpCallbackUrl,
      cancelAgreementHttpCallbackUrl: el.cancelAgreementHttpCallbackUrl
    }
  })
}
