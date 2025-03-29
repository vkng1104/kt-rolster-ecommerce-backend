import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';

const BASE_URL = 'http://localhost:3000';

interface Product {
  product_id: string;
  name: string;
  price: number;
}

async function addToCart(numberOfProducts: number) {
  // GET ALL PRODUCTS
  const products = await axios.get(`${BASE_URL}/products`);
  console.log('Product length:', products.data.length);

  // ADD RANDOM PRODUCT TO CART
  for (let i = 0; i < numberOfProducts; i++) {
    const randomProduct =
      products.data[Math.floor(Math.random() * products.data.length)];
    await addRandomProductToCart(randomProduct);
  }
}

async function addRandomProductToCart(product: Product) {
  const accessToken = readFileSync(
    'scripts-to-add-data/user_access_token.txt',
    'utf8',
  );

  // api cart/items
  const response = await axios.post(
    `${BASE_URL}/cart/items`,
    {
      product_id: product.product_id,
      quantity: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  writeFileSync('scripts-to-add-data/cart_id.txt', response.data.cart_id);
}

addToCart(5);
