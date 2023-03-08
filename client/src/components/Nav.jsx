import '../styles//Nav.css'
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCountry, getCountriesBack, getActivities } from '../redux/actionsBack'
import { AiOutlineFilter } from 'react-icons/ai';
import { BsSortAlphaDownAlt, BsSortAlphaUpAlt, BsSortNumericDownAlt, BsSortNumericUpAlt } from "react-icons/bs"
import {
    getCountriesPerContinent,
    getCountriesPerActivity,
    changePageNumbers,
    cleanFilters,
    orderPopulation,
    atozztoa,
    changeFlag,
    changeFlagReset
} from '../redux/actionsFront';
import { useEffect } from 'react';


const Nav = () => {
    const [input, setInput] = React.useState({
        name: ""
    })

    const [filter, setFilter] = React.useState({
        continent: "",
        activity: ""
    })

    const dispatch = useDispatch()
    const activities = useSelector((state) => state.activities)
    const countriesFiltered = useSelector((state) => state.countriesFiltered)
    // const flag = useSelector((state) => state.flag)
    const flagReset = useSelector((state) => state.flagReset)

    let activitiesFiltered = []

    activities.map((actividad) => {
        if (!activitiesFiltered.includes(actividad)) return activitiesFiltered.push(actividad.name)
        else { return false }
    })

    let nonRepeteadActivities = activitiesFiltered.filter((item, index) => {
        return activitiesFiltered.indexOf(item) === index;
    })


    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])

    const changeHandler = (event) => {
        const { name, value } = event.target
        setInput({
            ...input,
            [name]: value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const { name } = input
        if (!name) { alert("Please insert a name") }
        dispatch(getCountry(name))
        dispatch(changePageNumbers(await getCountriesBack(name)))
    }

    const changeContinent = async (e) => {
        const continentName = e.target.value
        const { activity } = filter
        setFilter({ ...filter, continent: continentName })
        if (activity) { setFilter({ ...filter, activity: "" }) }
        dispatch(getCountriesPerContinent(continentName))
        dispatch(changePageNumbers(countriesFiltered))
        setFilter({ ...filter, activity: "" })
        setFilter({ ...filter, continent: "" })
        dispatch(changeFlag(true))
    }


    const handlerChangeActivity = async (e) => {
        const activityName = e.target.value
        const { continent, activity } = filter

        //no existe continente filtra por actividad
        if (!continent) {
            setFilter({ ...filter, activity: activityName })
            dispatch(cleanFilters())
            dispatch(getCountriesPerActivity(activityName))
        }
        if (continent && !activity) {
            dispatch(getCountriesPerContinent(continent))
            dispatch(getCountriesPerActivity(activityName))
        }
        //existe continente y existe actividad
        if (continent & activity) {
            dispatch(getCountriesPerContinent(continent))
            dispatch(getCountriesPerActivity(activityName))
            setFilter({ ...filter, activity: "" })
            setFilter({ ...filter, continent: "" })
        }
        dispatch(changePageNumbers(countriesFiltered))
    }



    const handlerCleanFilters = () => {
        setFilter({ ...filter, activity: "" })
        setFilter({ ...filter, continent: "" })
        setFilter({ ...input, name: "" })
        dispatch(cleanFilters())

        if (!flagReset) {
            return dispatch(changeFlagReset(true))
        }

    }

    const handlerChangeAlphabetically = (e) => {
        e.preventDefault();
        const { value } = e.target
        dispatch(atozztoa(value))
    }

    const handlerChangePopulation = (e) => {
        e.preventDefault();
        const { value } = e.target
        dispatch(orderPopulation(value))
        dispatch(changePageNumbers(countriesFiltered))
    }

    return (


        < div className='' >
            < form className="searchCountry m-1 mt-3 mb-2" onSubmit={submitHandler} >
                <input type="text" name="name" className='form-control form-control-sm' placeholder='Search Country' value={input.name} onChange={changeHandler}></input>
            </form >
            <div className='row justify-content-center mb-4'>
                <button className='col-lg-4 col-sm-5 btn btn-sm btn-outline-light m-1'> <Link to="/createMultipleActivity">Create Activity</Link></button>
                <button className='col-lg-4 col-sm-5 btn  btn-sm  btn-outline-light m-1' type="reset" onClick={handlerCleanFilters}>Clear Filters</button>
            </div>
            <div className='filterContinent mb-3'>
                <div> <label className='h2 ms-1'>CONTINENT </label> <AiOutlineFilter style={{ color: "#e6f3ff" }} className="ms-1" /></div>

                <button className='btn btnContinent btn-sm btn-outline-light m-1' name="continent" id="North America" value="North America" onClick={changeContinent}>North America</button>

                <button className='btn btnContinent btn-sm btn-outline-light m-1' name="continent" id="South America" value="South America" onClick={changeContinent}> South America</button>

                <button className='btn btnContinent btn-sm btn-outline-light m-1' name="continent" id="Antarctica" value="Antarctica" onClick={changeContinent}>Antarctica</button>

                <button className='btn btnContinent btn-sm btn-outline-light m-1' name="continent" id="Africa" value="Africa" onClick={changeContinent}>Africa </button>

                <button className='btn btnContinent btn-sm btn-outline-light m-1' name="continent" id="Europe" value="Europe" onClick={changeContinent}> Europe </button>

                <button className='btn btnContinent btn-sm btn-outline-light m-1' name="continent" id="Oceania" value="Oceania" onClick={changeContinent}>Oceania </button>
            </div>
            <div>
                <div className='filterActivities mb-2'>
                    <label className='h2 ms-1' htmlFor="activities">ACTIVITY </label>
                    <select onChange={handlerChangeActivity} className="ms-2" name="activities" id="activity-select">
                        <option className='option1'> Choose Activity</option>
                        {nonRepeteadActivities.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='row '>
                    <div className='order col-lg-6 col-sm-12 col-sm-12'>
                        <label className='h2 ms-1'>NAME </label>
                        <br />
                        <button className='btn btnSort btn-outline-light m-1' value="atoz" onClick={handlerChangeAlphabetically}><BsSortAlphaUpAlt /></button>
                        <button className='btn  btnSort btn-outline-light m-1' value="ztoa" onClick={handlerChangeAlphabetically}><BsSortAlphaDownAlt /></button>
                    </div>
                    <div className='order col-lg-6 col-sm-12 col-sm-12'>
                        <label className='h2 ms-1' >POPULATION</label>
                        <br />
                        <button className='btn btnSort btn-outline-light m-1' value="menor" onClick={handlerChangePopulation}><BsSortNumericUpAlt /></button>
                        <button className='btn btnSort btn-outline-light m-1' value="mayor" onClick={handlerChangePopulation}> <BsSortNumericDownAlt /></button>
                    </div>
                </div>
            </div>

        </div >
    );
}
export default Nav;

