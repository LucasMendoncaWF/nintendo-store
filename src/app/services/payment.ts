import { CardPaymentModel } from 'app/models/paymentModel';
import { AES } from 'crypto-js';

import api from './api';

export function cardPay(data: CardPaymentModel) {
  const secretKey = process.env.REACT_APP_NOT_SECURE_KEY;
  if (!secretKey) {
    return null;
  }
  const dataString = JSON.stringify(data);
  const encrypted = AES.encrypt(dataString, secretKey).toString();
  return api.post('payment', encrypted);
}
