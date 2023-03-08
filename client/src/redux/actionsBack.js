import axios from 'axios'
import swal from 'sweetalert';
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";


export const getAllCountries = () => {
    return function (dispatch) {
        return axios
            .get(`http://localhost:3002/countries`)
            .then((response) => {
                dispatch({
                    type: GET_ALL_COUNTRIES,
                    payload: response.data
                })
            })
            .catch((error) =>
                alert("EROR_NETWORK")
            )
    }
}

export const getCountry = (name) => {
    return function (dispatch) {
        return axios
            .get(`http://localhost:3002/countries?name=${name}`)
            .then((response) => {
                dispatch({ type: GET_COUNTRY_BY_NAME, payload: response.data })
            })
            .catch((error) => {
                if (error.response === undefined) { alert('No internet connection') }
                if (error.response.status === 400) { alert(`Country with name: ${name} does not exist`) }
            })
    }
}

export const getCountriesBack = (name) => {
    return axios
        .get(`http://localhost:3002/countries?name=${name}`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            if (error.response === undefined) { alert('No internet connection') }
            if (error.response.status === 400) { alert(`Country with name: ${name} does not exist`) }
        })
}

export const getCountryById = (idCountry) => {
    return function (dispatch) {
        return axios
            .get(`http://localhost:3002/countries/${idCountry}`)
            .then((response) => {

                dispatch({ type: GET_COUNTRY_BY_ID, payload: response.data })
                return response.data
            })
            .catch((error) => {
                if (error.response === undefined) { alert('No internet connection') }
                if (error.response.status === 400) { alert(`Country with id: ${idCountry} does not exist`) }
            })
    }
}

export const getActivities = () => {
    return function (dispatch) {
        return axios
            .get(`http://localhost:3002/activities`)
            .then((response) => {
                dispatch({ type: GET_ACTIVITIES, payload: response.data })
            })
    }
}

export const createActivity = ({ name, difficulty, duration, season, idCountries, review }) => {
    return function (dispatch) {
        return axios
            .post(`http://localhost:3002/activities`, {
                name,
                difficulty: parseInt(difficulty),
                duration: parseInt(duration),
                season,
                idCountries,
                review
            })

            .then((response) => {
                if (!response.data[0][1]) {
                    swal(`La actividad ya se encuentra registrada`, `"${name}"`, "error")

                } else {
                    dispatch({
                        type: CREATE_ACTIVITY,
                        payload: response.data
                    })
                    swal(`Se creo la actividad`, `"${name}"`, "success")
                }
            })
            .catch((error) => {
                if (error.response.data) { alert("Faltan datos") }
            })

    }
}

export function deleteActivity(idCountry, id, name) {
    return axios.delete(`http://localhost:3002/activities/${idCountry}/${id}`)
        .then((response) => {
            if (response.data) {
                swal(`Activity delete`, `"${name}"`, "success")
                return response.data
            }
            else {
                swal(`An error occurred while deleting`, `"${name}"`, "error")

            }
        })
}



