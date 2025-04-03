const express = require('express');
const router = express.Router();
const { Meta, Periodo } = require('../models'); // Asegúrate de ajustar la ruta a tus modelos

// Obtener todas las metas
router.get('/', async (req, res) => {
  try {
    const metas = await Meta.findAll({
      include: [{ model: Periodo, as: 'periodo' }], // Incluye la información del periodo asociado
    });
    res.json(metas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una meta por su ID
router.get('/:id', async (req, res) => {
  try {
    const meta = await Meta.findByPk(req.params.id, {
      include: [{ model: Periodo, as: 'periodo' }],
    });
    if (meta) {
      res.json(meta);
    } else {
      res.status(404).json({ message: 'Meta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva meta
router.post('/', async (req, res) => {
  try {
    const meta = await Meta.create(req.body);
    res.status(201).json(meta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar una meta
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Meta.update(req.body, {
      where: { id_meta: req.params.id },
    });
    if (updated) {
      const updatedMeta = await Meta.findByPk(req.params.id);
      res.json(updatedMeta);
    } else {
      res.status(404).json({ message: 'Meta no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una meta
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Meta.destroy({
      where: { id_meta: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Meta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
