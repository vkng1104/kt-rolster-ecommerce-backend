import axios from 'axios';
import { readFileSync } from 'fs';

export enum PaymentType {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
}

export enum ShippingMethod {
  STANDARD = 'standard',
  EXPRESS = 'express',
  OVERNIGHT = 'overnight',
}

const BASE_URL = 'http://localhost:3000';

async function placeOrder() {
  const accessToken = readFileSync(
    'scripts-to-add-data/user_access_token.txt',
    'utf8',
  );
  // GET CART ID
  const cartId = readFileSync('scripts-to-add-data/cart_id.txt', 'utf8');

  // PLACE ORDER
  const response = await axios.post(
    `${BASE_URL}/orders`,
    {
      cart_id: cartId,
      payment_type: PaymentType.CREDIT_CARD,
      shipping_method: ShippingMethod.STANDARD,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  console.log(response.data);
}

placeOrder();
