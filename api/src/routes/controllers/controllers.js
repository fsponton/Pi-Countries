const axios = require('axios');
const { Activity } = require('../../db');


const getCapital = (_capital, nameCountry) => {
    return _capital ? _capital : nameCountry;
}

const getCountriesApi = async () => {

    try {
        const arrayResponse = await axios.get('https://restcountries.com/v3.1/all')
        // console.log(Array.isArray(array))
        const countries = arrayResponse.data.map(
            _country => {


                return {
                    id: _country.cca3,
                    name: _country.name.common,
                    flags: _country.flags.png,
                    continent: _country.continents[0],
                    capital: getCapital(_country.capital, _country.name.common),
                    subregion: _country.subregion || _country.region,
                    area: _country.area,
                    population: _country.population,
                }

            }
        )
        console.log(countries, "var countries")
        return countries
    } catch (error) {
        //${__filename} define donde esta el error, se utiliza para el desarrollo
        return `"no funciona la api ${__filename}"`;
    }
}


const upper = (country) => {

    const arrName = country.split(" ");

    return arrName.map(word => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(' ');

}



const addActivityy = async (name, difficulty, duration, season, idCountries, review) => {
    let newActivities = [];
    name = upper(name);
    for (id of idCountries) {
        let [activity, created] = await Activity.findOrCreate({
            where: {
                name,
                difficulty,
                duration,
                season
            },
            defaults: {
                name,
                difficulty,
                duration,
                season,
                review
            }
        })

        // console.log("acitvity del array?" + [activity, create])
        // espera a que la actividad este creada para poder agregarle el id del pais a la actividad
        await activity.addCountry(idCountries);
        newActivities.push([activity, created]);
    }
    return newActivities;
}

module.exports = { getCountriesApi, upper, addActivityy };