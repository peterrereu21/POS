require('dotenv').config();
const express = require('express');
const productsRouter = require('./routes/products');

const app = express();
app.use(express.json());
app.use('/api/products', productsRouter);
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

process.on('SIGINT', async () => {
  console.log('Shutting down');
  server.close(() => process.exit(0));
});
