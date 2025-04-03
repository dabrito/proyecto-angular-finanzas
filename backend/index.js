const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Rutas
const transaccionesRouter = require('./routes/transacciones');
const categoriasRouter = require('./routes/categorias');
const tipoRouter = require('./routes/tipo');
//const conversionRoutesRouter = require('./routes/conversionRoutes');
const metaRoutes = require('./routes/meta'); 


app.use('/api/transacciones', transaccionesRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/tipos', tipoRouter);
//app.use('/api/conversionRouter', conversionRoutesRouter)
app.use('/api/metas', metaRoutes);


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
