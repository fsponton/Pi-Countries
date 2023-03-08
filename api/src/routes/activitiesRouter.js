const { Router } = require('express');
const router = Router();
//importo funciones de controllers y modelo de actividades .
const { addActivityy } = require('./controllers/controllers');
const { Activity, Country, } = require('../db');


router.post("/", async (req, res) => {
    const { name, difficulty, duration, season, idCountries, review } = req.body;
    if (!name || !difficulty || !season || !duration || !idCountries) return res.status(400).send("Faltan datos");

    try {
        const newActivities = await addActivityy(name, difficulty, duration, season, idCountries, review);
        console.log("newActivities")
        for (let i = 0; i < newActivities.length; i++) {
            console.log(newActivities[i][i])
        }

        return res.status(201).send(newActivities);
    } catch (error) {
        return res.status(404).send(error.message);
    }

})

router.get("/", async (req, res) => {
    const actividades = await Activity.findAll({ include: Country });
    const filterActivities = actividades.filter((activity) => {
        const largo = activity.countries.length
        if (largo > 0) { return activity }
        return
    })
    // console.log(Object.keys(actividades))
    try {
        res.status(200).send(filterActivities);
    } catch (error) {
        res.status(404).send(error.message);
    }
})


router.delete("/:idCountry/:id", async (req, res) => {
    const { idCountry, id, name } = req.params;
    const country = await Country.findByPk(idCountry,
        {
            include: {
                model: Activity,
                where: { id }
            }
        })
    // console.log(country.activities[0].activityCountry)
    await country.activities[0].activityCountry.destroy();
    return res.status(200).send(`Se borro la actividad$ {name}`)
})




module.exports = router;