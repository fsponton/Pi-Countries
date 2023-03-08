const { Router } = require('express');
const { Op } = require('sequelize');
const router = Router();
//importofunciones y  los modelos de los paises para utilizarlos.;
const { getCountriesApi, upper } = require('./controllers/controllers');
const { Country, Activity } = require('../db');


//first get and get by name for query
router.get('/', async (req, res) => {
    const data = await Country.findAll({ order: [['name', 'ASC']], include: Activity });
    const { name } = req.query;

    if (!data.length) {
        try {
            const countries = await getCountriesApi();
            let newCountries = await Country.bulkCreate(countries);
            newCountries = await Country.findAll({ order: [['name', 'ASC']], include: Activity });
            return res.status(201).send(newCountries);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }

    if (name) {
        try {
            const nombre = upper(name);
            const country = await Country.findAll({
                where: {
                    name: { [Op.substring]: nombre }
                }
            });
            if (!country.length) return res.status(400).send("No existe el pais buscado");
            return res.status(200).send(country);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }

    try {
        return res.status(200).send(data);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})


router.get('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        //El include funciona para agregarle el modelo actividad al pais.
        const country = await Country.findByPk(id, { include: Activity });
        if (country.length === 0) return res.status(400).send("No existe el ID buscado");
        return res.status(200).send(country);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get('/', async (req, res) => {
    try {
        const country = await Country.findAll({
            where: {
                name: { [Op.substring]: "henry" }
            }
        });
        if (!country.length) return res.status(400).send("No existe el pais buscado");
        return res.status(200).send(country);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

module.exports = router;