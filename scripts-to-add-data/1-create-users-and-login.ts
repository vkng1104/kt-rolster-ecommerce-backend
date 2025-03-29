import axios from 'axios';
import { writeFileSync } from 'fs';
// Define the base URL of the API
const BASE_URL = 'http://localhost:3000';

// Define the admin user data

const ADMIN_USER = {
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin',
  name: 'Admin User',
  phone_number: '+1234567890',
  address: '123 Admin St, Anytown, USA',
};

async function main() {
  // ADMIN USER
  console.log('Creating admin user...');
  const userRes = await axios.post(`${BASE_URL}/users/register`, ADMIN_USER);
  console.log('User created:', userRes.data);

  console.log('Admin login...');
  const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
    email: ADMIN_USER.email,
    password: ADMIN_USER.password,
  });
  console.log('Admin logged in:', loginRes.data);

  const accessToken = loginRes.data.access_token;
  writeFileSync('scripts-to-add-data/access_token.txt', accessToken);

  // NORMAL USER
  console.log('Creating normal user...');
  const normalUser = {
    email: 'normal@example.com',
    password: 'normal123',
    role: 'user',
    name: 'Normal User',
    phone_number: '+1234567890',
    address: '123 California St, San Francisco, USA',
  };
  const normalUserRes = await axios.post(
    `${BASE_URL}/users/register`,
    normalUser,
  );
  console.log('Normal user created:', normalUserRes.data);

  console.log('Normal user login...');
  const normalLoginRes = await axios.post(`${BASE_URL}/auth/login`, {
    email: normalUser.email,
    password: normalUser.password,
  });
  console.log('Normal user logged in:', normalLoginRes.data);
  writeFileSync(
    'scripts-to-add-data/user_access_token.txt',
    normalLoginRes.data.access_token,
  );
}
main().catch(console.error);
