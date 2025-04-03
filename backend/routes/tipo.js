const express = require('express');
const router = express.Router();
const { tipo } = require('../models');

router.get('/', async (req, res) => {
  try {
    const tipos = await tipo.findAll();
    res.json(tipos);
  } catch (error) {
    console.error('Error al obtener tipos:', error);
    res.status(500).json({ error: 'Error al obtener los tipos' });
  }
});

module.exports = router;