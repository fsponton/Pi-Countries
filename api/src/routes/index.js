const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const activities = require('./activitiesRouter');
const countries = require('./countriesRouter')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countries);
router.use('/activities', activities);

module.exports = router;
