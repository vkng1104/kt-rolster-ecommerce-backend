import axios from 'axios';
import { parse } from 'csv-parse';
import { createReadStream, readFileSync } from 'fs';
import * as path from 'path';

interface Product {
  product_id: string;
  collection_ids: string[];
  name: string;
  description: string;
  price: number;
  slug: string;
  stock_quantity: number;
  category_id: number;
}

async function getProducts(category_id: number) {
  const csvFilePath = path.join(__dirname, 'data', 'Products.csv');

  return new Promise<Product[]>((resolve, reject) => {
    const products: Product[] = [];

    createReadStream(csvFilePath)
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          bom: true,
        }),
      )
      .on('data', (row) => {
        products.push({
          product_id: row.ID,
          collection_ids: JSON.parse(row.Collections).filter(
            (collection_id: string) =>
              collection_id !== '00000000-000000-000000-000000000001',
          ),
          name: row.Name,
          description: row.Description,
          price: parseFloat(row.Price),
          slug: row.Slug,
          stock_quantity: Math.floor(Math.random() * 100) + 10,
          category_id: category_id,
        });
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        console.log('Number of products:', products.length);
        resolve(products); // ✅ Waits for parsing to complete
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        reject(error);
      });
  });
}

// Define the category data

const CATEGORY = {
  name: 'Electronics',
  description: 'Electronics category',
  slug: 'electronics',
};

// Define the base URL of the API
const BASE_URL = 'http://localhost:3000';

const BATCH_SIZE = 50;

async function main() {
  const accessToken = readFileSync(
    'scripts-to-add-data/access_token.txt',
    'utf8',
  );

  console.log('Creating category...');
  const categoryRes = await axios.post(`${BASE_URL}/categories`, CATEGORY, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('Category created:', categoryRes.data);

  console.log('Creating products...');
  const products = await getProducts(categoryRes.data.category_id);

  // Helper to chunk array
  const chunkArray = <T>(arr: T[], chunkSize: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
      arr.slice(i * chunkSize, i * chunkSize + chunkSize),
    );
  };

  const chunks = chunkArray(products, BATCH_SIZE);

  let totalCreated = 0;

  for (const [index, chunk] of chunks.entries()) {
    console.log(`Uploading batch ${index + 1}/${chunks.length}...`);

    const res = await Promise.allSettled(
      chunk.map((product) =>
        axios.post(
          `${BASE_URL}/products`,
          { ...product, category_id: categoryRes.data.category_id },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        ),
      ),
    );

    const successful = res.filter((r) => r.status === 'fulfilled').length;
    const failed = res.filter((r) => r.status === 'rejected').length;

    totalCreated += successful;

    console.log(
      `✅ Batch ${index + 1}: ${successful} success, ❌ ${failed} failed.`,
    );
  }

  console.log('Total products added to database:', totalCreated);
}

main();
