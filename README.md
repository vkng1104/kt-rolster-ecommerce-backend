# E-commerce Backend

A NestJS-based e-commerce backend application with TypeORM, PostgreSQL, and JWT authentication.

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Docker and Docker Compose (for running with Docker)
- PostgreSQL (if running without Docker)

## Environment Setup

1. Create a `.env` file in the root directory with the following content:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=2345
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=kt-rolster-e-commerce

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRATION=24h

# Server Configuration
PORT=3000
```

## Installation

1. Install dependencies:
```bash
yarn
```

## Running the Application

### First Time Setup

1. Start the application for the first time:
```bash
yarn restart
```

### Development Mode

1. Start the application in development mode:
```bash
yarn dev
```

This will:
- Build the application
- Start the server in development mode with hot-reload

### Docker Setup

1. Start the application with Docker:
```bash
yarn docker-up
```

2. Stop the Docker containers:
```bash
yarn docker-down
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login

### Users
- `POST /users/register` - User registration
- `GET /users/profile` - Get user info by JWT
- `PUT /users/profile` - Update user info
- `GET /users/:email` - Get user info by email
- `GET /users` - Get all users (admin only)
- `DELETE /users/:id` - Delete user (admin only)

### Products
- `GET /products` - Get all products
- `GET /products/search` - Search products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `PUT /products/:id/stock` - Update product stock (admin only)
- `DELETE /products/:id` - Delete product (admin only)

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category (admin only)
- `PUT /categories/:id` - Update category (admin only)
- `DELETE /categories/:id` - Delete category (admin only)

### Collections
- `GET /collections` - Get all collections
- `GET /collections/:id` - Get collection by ID
- `POST /collections` - Create collection (admin only)
- `PUT /collections/:id` - Update collection (admin only)
- `DELETE /collections/:id` - Delete collection (admin only)

### Cart
- `GET /cart` - Get user's cart (protected)
- `POST /cart/items` - Add item to cart (protected)
- `PUT /cart/items` - Update cart item (protected)
- `DELETE /cart/:id` - Remove item from cart (protected)
- `DELETE /cart` - Clear cart (protected)

### Orders
- `GET /orders` - Get all orders (protected)
- `GET /orders/:id` - Get order by ID (protected)
- `GET /orders/admin/all` - Get all orders of all users (protected)
- `POST /orders` - Create order from cart (protected)
- `PUT /orders/:id/status` - Update order status (admin only)
- `DELETE /orders/:id` - Delete order (admin only)

## Database Schema

The application uses PostgreSQL with the following main entities:
- Users
- Products
- Categories
- Collections
- Orders
- Cart
- Cart Items
- Favorites
- User Providers
- OAuth Logins

## Scripts

Additional scripts for data seeding and testing can be found in the `scripts-to-add-data` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.