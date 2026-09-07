const express = require('express');
const productsRouter = require('./routes/products');

const app = express();
app.use(express.json());
app.use('/api/products', productsRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
