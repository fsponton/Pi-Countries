import {
    GET_ALL_COUNTRIES, GET_COUNTRY_BY_NAME, GET_COUNTRY_BY_ID, GET_ACTIVITIES, CREATE_ACTIVITY
} from "./actionsBack";

import {
    GET_COUNTRIES_PER_CONTINENT, GET_COUNTRIES_PER_ACTIVITY, CHANGE_PAGE_NUMBER, ORDER_ALPHABETICALLY, CLEAN_FILTERS, ORDER_POPULATION, GET_ALL_ID_COUNTRIES, CHANGE_FLAG, CHANGE_FLAG_RESET, CHANGE_FLAG_ACTIVITY
} from "./actionsFront";

import { arrCountriesByContinent, countriesByActivity, arrPopulation, arrPagesNumber, arrAlphabetically, arrIdCountries } from './controllers/controllersReducer'


const initialState = {
    countries: [],
    country: {},
    countriesFiltered: [],
    activities: [],
    pageNumbers: Array.from({ length: 25 }, (_, i) => i + 1),
    storeIdCountries: [],
    flag: false,
    flagReset: false,
    flagActivity: false
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                countriesFiltered: action.payload
            }
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countriesFiltered: action.payload,
                pageNumbers: arrPagesNumber(state.countriesFiltered)
            }
        case GET_COUNTRY_BY_ID:
            return {
                ...state,
                country: action.payload
            }
        case GET_COUNTRIES_PER_CONTINENT:
            return {
                ...state,
                countriesFiltered: arrCountriesByContinent(state.countries, action.payload)
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case GET_COUNTRIES_PER_ACTIVITY:
            return {
                ...state,
                countriesFiltered: countriesByActivity(state.countriesFiltered, action.payload)
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, action.payload]
            }
        case CHANGE_PAGE_NUMBER:
            return {
                ...state,
                pageNumbers: arrPagesNumber(state.countriesFiltered)
            }
        case ORDER_ALPHABETICALLY:
            return {
                ...state,
                countriesFiltered: arrAlphabetically(state.countriesFiltered, action.payload),
                pageNumbers: arrPagesNumber(state.countriesFiltered)
            }
        case CLEAN_FILTERS:
            return {
                ...state,
                country: {},
                countriesFiltered: state.countries,
                pageNumbers: Array.from({ length: 25 }, (_, i) => i + 1),
                flag: false
            }
        case ORDER_POPULATION:
            return {
                ...state,
                countriesFiltered: arrPopulation(state.countriesFiltered, action.payload),
                pageNumbers: arrPagesNumber(state.countriesFiltered)
            }
        case GET_ALL_ID_COUNTRIES:
            return {
                ...state,
                storeIdCountries: arrIdCountries(state.countries)
            }
        case CHANGE_FLAG:
            return {
                ...state,
                flag: action.payload
            }
        case CHANGE_FLAG_RESET:
            return {
                ...state,
                flagReset: action.payload
            }
        case CHANGE_FLAG_ACTIVITY:
            return {
                ...state,
                flagActivity: action.payload
            }
        default: return { ...state }
    };
};


export default rootReducer;