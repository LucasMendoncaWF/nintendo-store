export interface CardPaymentModel {
  cardNumber: string;
  expiry: string;
  cvc: string;
  name: string;
  type?: string;
}