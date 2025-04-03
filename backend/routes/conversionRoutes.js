const express = require('express');
const router = express.Router();
const axios = require('axios');
const { ConversionHistorial } = require('../models');

router.post('/convert', async (req, res) => {
  const { monto_origen, moneda_origen, moneda_destino } = req.body;

  try {
    // Llamada a la API externa para obtener la tasa de conversión en tiempo real
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${moneda_origen}`);
    const tasa_conversion = response.data.rates[moneda_destino];

    // Calcula el monto convertido
    const monto_convertido = monto_origen * tasa_conversion;
    const fecha = new Date();

    // Guarda el historial de la conversión
    const historial = await ConversionHistorial.create({
      monto_origen,        // Guarda el monto original
      moneda_origen,
      moneda_destino,
      monto_convertido,
      tasa_conversion,
      fecha
    });

    // Responde con el historial de la conversión
    res.json({ historial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
