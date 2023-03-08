import '../styles/CountryDetail.css'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getActivities, getCountryById } from '../redux/actionsBack';
import { cleanFilters, changeFlagReset } from '../redux/actionsFront';
import { ActivityDetail } from './ActivityDetail';
import { IconContext } from 'react-icons/lib';
import { BsPeople } from "react-icons/bs";
import { TbChartAreaLine } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";

const CountryDetail = (props) => {
    const dispatch = useDispatch();
    const country = useSelector((state) => state.country)
    const id = props.match.params.id;


    useEffect(() => {
        dispatch(getCountryById(id));
        dispatch(getActivities());
    }, [dispatch, id])

    const clean = () => {
        dispatch(cleanFilters())
        dispatch(changeFlagReset(true))
    }


    return (
        < div className='container-fluid' >
            <div className='row'>
                <div className='infoCountry col-lg-5 col-sm-12' >
                    <div className='d-flex justify-content-center'>
                        <img src={country.flags} alt={`flag ${country.flags}`} />
                    </div>
                    <div className='description d-flex justify-content-center text-center'>
                        <div className='col-6' >
                            <span className='title' >COUNTRY</span><p> {country.name}  </p>
                            <span className='title' >CODE</span><p> {country.id}</p>
                            <span className='title' >CAPITAL</span> <p>{country.capital}</p>
                        </div>
                        <div className='col-6'>
                            <span className='title' >SUB REGION</span>
                            <p>
                                <IconContext.Provider value={{ color: 'green', size: '22px' }} >
                                    <BiWorld />
                                </IconContext.Provider>
                                {country.subregion}
                            </p>
                            <span className='title' >AREA</span>
                            <p>
                                <IconContext.Provider value={{ color: 'brown', size: '22px' }} >
                                    <TbChartAreaLine />
                                </IconContext.Provider>
                                {country.area} km2
                            </p>
                            <span className='title' >POPULATION</span>
                            <p>
                                <IconContext.Provider value={{ color: 'white', size: '22px' }}>
                                    <BsPeople />
                                </IconContext.Provider>
                                {country.population}
                            </p>
                        </div>
                    </div>
                </div>


                <div className='activity col-lg-7 col-sm-12' >
                    <div className='row align-items-start'>
                        <div className='col-lg-8 col-sm-12'> <p id='titleTourist'>Tourist Activities</p> </div>
                        <div className='col-lg-4 col-sm-12 align-self-center'><Link className='btn btn-sm btn-outline-light' to="/addActivity">Add new activity</Link></ div>
                    </div>
                    {(country["activities"]?.length === 0) ?
                        <div><p className='activityDetail'>This country doesn't have any activities</p></div> :
                        country["activities"]?.map(
                            (activity, index) =>
                                < ActivityDetail idCountry={id}
                                    id={activity.id}
                                    name={activity.name}
                                    difficulty={activity.difficulty}
                                    duration={activity.duration}
                                    season={activity.season}
                                    review={activity.review}
                                    key={index}
                                />
                        )
                    }
                </div>
                <div className='d-flex justify-content-center mt-2 mb-2'>
                    <Link className='btn btnContinent btn-sm btn-outline-light m-1' to="/" onClick={clean}>Back to Home</Link>
                </div>
            </div>
        </div >

    );
};

export default CountryDetail;

