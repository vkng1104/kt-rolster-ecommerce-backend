import axios from 'axios';
import { parse } from 'csv-parse';
import { createReadStream, readFileSync } from 'fs';
import * as path from 'path';

interface Collection {
  collection_id: string;
  name: string;
  description: string;
  slug: string;
}

async function getCollections() {
  const csvFilePath = path.join(__dirname, 'data', 'Collections.csv');

  return new Promise<Collection[]>((resolve, reject) => {
    const collections: Collection[] = [];

    createReadStream(csvFilePath)
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          bom: true,
        }),
      )
      .on('data', (row) => {
        if (row.ID !== '00000000-000000-000000-000000000001') {
          collections.push({
            collection_id: row.ID,
            name: row.Name,
            description: row.Description,
            slug: row.Slug,
          });
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        console.log('Number of collections:', collections.length);
        resolve(collections); // ✅ Waits for parsing to complete
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        reject(error);
      });
  });
}

// Define the base URL of the API
const BASE_URL = 'http://localhost:3000';

async function main() {
  const accessToken = readFileSync(
    'scripts-to-add-data/access_token.txt',
    'utf8',
  );

  console.log('Creating collections...');
  // use access token to create product
  const collections = await getCollections();

  const collectionRes = await Promise.all(
    collections.map(async (collection) => {
      await axios.post(`${BASE_URL}/collections`, collection, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }),
  );
  console.log('Number of collections added to database:', collectionRes.length);
}

main();
