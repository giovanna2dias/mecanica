const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM cliente ORDER BY id_cliente');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { nome, cpf, telefone, endereco } = req.body;
  const result = await pool.query(
    'INSERT INTO cliente (nome, cpf, telefone, endereco) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, cpf, telefone, endereco]
  );
  res.status(201).json(result.rows[0]);
});

router.get('/:id/veiculos', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM veiculo WHERE id_cliente = $1 ORDER BY id_veiculo',
    [req.params.id]
  );
  res.json(result.rows);
});

module.exports = router;
