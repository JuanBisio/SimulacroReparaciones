const express = require('express');
const router = express.Router();
const reparacionService = require('../services/reparacionService');

// Ruta para obtener todas las reparaciones
router.get('/reparaciones', async (req, res) => {
  try {
    const datos = await reparacionService.getAll();
    res.json(datos);
  } catch (err) {
    console.error('Error al obtener todas las reparaciones:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para buscar por nombre de cliente
router.get('/reparaciones/:client', async (req, res) => {
  try {
    const nombre = req.params.client;
    const datos = await reparacionService.getAllByCliente(nombre);
    res.json(datos);
  } catch (err) {
    console.error('Error al buscar reparaciones por cliente:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
