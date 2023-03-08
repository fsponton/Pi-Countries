
export const GET_COUNTRIES_PER_CONTINENT = "GET_COUNTRIES_PER_CONTINENT"
export const GET_COUNTRIES_PER_ACTIVITY = "GET_COUNTRIES_PER_ACTIVITY"
export const CHANGE_PAGE_NUMBER = "CHANGE_PAGE_NUMBER"
export const ORDER_ALPHABETICALLY = " ORDER_ALPHABETICALLY"
export const CLEAN_FILTERS = " CLEAN_FILTERS"
export const ORDER_POPULATION = "ORDER_POPULATION"
export const GET_ALL_ID_COUNTRIES = "GET_ALL_ID_COUNTRIES"
export const CHANGE_FLAG = "CHANGE_FLAG"
export const CHANGE_FLAG_RESET = "CHANGE_FLAG_RESET"
export const CHANGE_FLAG_ACTIVITY = "CHANGE_FLAG_ACTIVITY"


export const getCountriesPerContinent = (continent) => {
    return { type: GET_COUNTRIES_PER_CONTINENT, payload: continent }
}

export const getCountriesPerActivity = (activity) => {
    return { type: GET_COUNTRIES_PER_ACTIVITY, payload: activity }
}

export const changePageNumbers = () => {
    return { type: CHANGE_PAGE_NUMBER }
}

export const atozztoa = (order) => {
    return { type: ORDER_ALPHABETICALLY, payload: order }
}

export const orderPopulation = (order) => {
    return { type: ORDER_POPULATION, payload: order }
}


export const cleanFilters = () => {
    return { type: CLEAN_FILTERS }
}


export const getallidCountries = () => {
    return { type: GET_ALL_ID_COUNTRIES }
}




export const changeFlag = (boolean) => {
    return { type: CHANGE_FLAG, payload: boolean }
}

export const changeFlagReset = (boolean) => {
    return { type: CHANGE_FLAG_RESET, payload: boolean }
}

export const changeFlagActivity = (boolean) => {
    return { type: CHANGE_FLAG_ACTIVITY, payload: boolean }
}