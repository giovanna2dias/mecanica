const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query(
    `SELECT v.*, c.nome AS nome_cliente
     FROM veiculo v
     JOIN cliente c ON c.id_cliente = v.id_cliente
     ORDER BY v.id_veiculo`
  );
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { placa, marca, modelo, ano, cor, id_cliente } = req.body;
  const result = await pool.query(
    'INSERT INTO veiculo (placa, marca, modelo, ano, cor, id_cliente) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [placa, marca, modelo, ano, cor, id_cliente]
  );
  res.status(201).json(result.rows[0]);
});

router.get('/:id/manutencoes', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM manutencao WHERE id_veiculo = $1 ORDER BY data_entrada DESC',
    [req.params.id]
  );
  res.json(result.rows);
});

module.exports = router;
