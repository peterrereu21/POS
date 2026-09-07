POS project scaffold

Backend (Express + Prisma):
- cd backend
- npm install
- copy ../.env.example to .env and set DATABASE_URL
- npx prisma migrate dev --name init
- npm run dev

Health check: GET http://localhost:3000/health
Products endpoints: GET /api/products

Next: replace the in-memory products with Prisma client queries and implement auth, sales, inventory.
