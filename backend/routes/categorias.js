const express = require('express');
const router = express.Router();
const { Categoria } = require('../models');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
