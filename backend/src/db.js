let prismaClient;
try {
  const { PrismaClient } = require('@prisma/client');
  prismaClient = new PrismaClient();
} catch (err) {
  console.warn('Prisma client unavailable, using file-based fallback.');
  const fs = require('fs');
  const path = require('path');
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const productsFile = path.join(dataDir, 'products.json');
  if (!fs.existsSync(productsFile)) {
    const sample = [
      { id: 1, sku: 'P001', name: 'Coca Cola 330ml', price: 1.5, quantity: 100 },
      { id: 2, sku: 'P002', name: 'Bread Loaf', price: 0.8, quantity: 50 }
    ];
    fs.writeFileSync(productsFile, JSON.stringify(sample, null, 2));
  }

  const readProducts = () => JSON.parse(fs.readFileSync(productsFile, 'utf8'));
  const writeProducts = (arr) => fs.writeFileSync(productsFile, JSON.stringify(arr, null, 2));

  prismaClient = {
    product: {
      findMany: async () => readProducts(),
      findUnique: async ({ where }) => {
        const arr = readProducts();
        return arr.find(p => p.id === where.id) || null;
      }
    }
  };
}
module.exports = prismaClient;
