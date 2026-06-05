# LUMONSE Backend — REST API

Node.js/Express REST API for the LUMONSE e-commerce platform.

**API Base URL**: https://lumonse-backend.onrender.com

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Deployed on Render

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/produits | Get all products |
| GET | /api/produits/:id | Get product by ID |
| POST | /api/produits | Create product |
| PUT | /api/produits/:id | Update product |
| DELETE | /api/produits/:id | Delete product |

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/profil | Get user profile (protected) |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/JohnMonsenempo/lumonse-backend.git

# Install dependencies
npm install

# Create .env file
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000

# Start server
node server.js
```

## Author

**John Monsenempo**
- GitHub: [@JohnMonsenempo](https://github.com/JohnMonsenempo)
