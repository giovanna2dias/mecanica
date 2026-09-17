require('dotenv').config();
const path = require('path');
const express = require('express');

const clientesRouter = require('./routes/clientes');
const veiculosRouter = require('./routes/veiculos');
const manutencoesRouter = require('./routes/manutencoes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use('/api/clientes', clientesRouter);
app.use('/api/veiculos', veiculosRouter);
app.use('/api/manutencoes', manutencoesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
