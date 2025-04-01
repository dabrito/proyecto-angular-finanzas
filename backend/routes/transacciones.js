const express = require('express');
const router = express.Router();
const { Transaccion, Categoria } = require('../models');

// Obtener todas las transacciones
router.get('/', async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll({
      include: {
        model: Categoria,
        as: 'categoria',
      },
    });
    res.json(transacciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener transacciones' });
  }
});

// Crear nueva transacción
router.post('/', async (req, res) => {
  try {
    const nueva = await Transaccion.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear transacción' });
  }
});

// Eliminar transacción
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Transaccion.destroy({ where: { id } });
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Transacción no encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar transacción' });
  }
});

module.exports = router;
