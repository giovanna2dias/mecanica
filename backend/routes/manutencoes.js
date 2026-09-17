const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  const { id_veiculo, data_entrada, descricao, tipo, situacao } = req.body;
  const result = await pool.query(
    `INSERT INTO manutencao (id_veiculo, data_entrada, descricao, tipo, situacao)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [id_veiculo, data_entrada, descricao, tipo, situacao || 'aguardando']
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req, res) => {
  const { situacao, data_entrega } = req.body;
  const result = await pool.query(
    `UPDATE manutencao SET situacao = $1, data_entrega = $2
     WHERE id_manutencao = $3 RETURNING *`,
    [situacao, data_entrega || null, req.params.id]
  );
  res.json(result.rows[0]);
});

module.exports = router;
