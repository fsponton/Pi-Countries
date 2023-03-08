export const arrCountriesByContinent = (paises, continent) => {
    if (!continent) { return paises }
    return paises.filter(country => country.continent === continent)
}


export const countriesByActivity = (paises, actividad) => {
    const currentCountries = []
    const nameCountries = []
    if (paises[0].activities === undefined) { return [] }
    for (let i = 0; i < paises.length; i++) {
        if (paises[i].activities.length) {
            for (let j = 0; j < paises[i].activities.length; j++) {
                if (paises[i].activities[j].name === actividad) {
                    currentCountries.push(paises[i])
                    if (!nameCountries.includes(paises[i].name)) { nameCountries.push(paises[i].name) }
                }
            }
        }
    }
    const flagForNames = []
    const countries = []
    for (const name of nameCountries) {
        for (const country of currentCountries) {
            if (name === country.name && !flagForNames.includes(name)) {
                flagForNames.push(name)
                countries.push(country)
            }
        }
    }
    if (countries.length === 0) {
        return []
    } else {
        return countries;
    }
}

export const arrPagesNumber = (paises) => {
    let arrPageNumbers = []
    for (let i = 1; i <= Math.ceil(paises.length / 10); i++) {
        arrPageNumbers.push(i)
    }
    return arrPageNumbers
}

export const orderByName = (countries) => {
    let arr = countries.sort((country1, country2) => {
        if (country1.name < country2.name) { return -1 }
        if (country1.name > country2.name) { return 1 }
        return 0
    })
    return arr
}

export const arrAlphabetically = (countries, stringOrder) => {
    let arr = orderByName(countries)
    if (stringOrder === "ztoa") {
        return arr.reverse()
    }
    return arr
}

export const arrPopulation = (countries, stringOrder) => {
    let arr = countries.sort((country1, country2) => {
        return country2.population - country1.population
    })
    if (stringOrder === "menor") {
        return arr.reverse()
    }
    return arr
}

export const arrIdCountries = (countries) => {
    let idCountries = []
    for (let country of countries) {
        idCountries.push(country.id)
    }
    return idCountries
}