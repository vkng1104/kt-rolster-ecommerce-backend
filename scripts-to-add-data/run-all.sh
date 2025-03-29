#!/bin/bash

echo "Step 1: Creating users and logging in..."
yarn ts-node scripts-to-add-data/1-create-users-and-login.ts
sleep 2

echo "Step 2: Reading collections..."
yarn ts-node scripts-to-add-data/2-read-collections.ts
sleep 5

echo "Step 3: Reading products..."
yarn ts-node scripts-to-add-data/3-read-products.ts
sleep 10

echo "Step 4: Adding to cart..."
yarn ts-node scripts-to-add-data/4-add-to-cart.ts
sleep 2

echo "Step 5: Placing order..."
yarn ts-node scripts-to-add-data/5-place-an-order.ts
