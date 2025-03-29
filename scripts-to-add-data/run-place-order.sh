#!/bin/bash

echo "Step 4: Adding to cart..."
yarn ts-node scripts-to-add-data/4-add-to-cart.ts
sleep 2

echo "Step 5: Placing order..."
yarn ts-node scripts-to-add-data/5-place-an-order.ts
