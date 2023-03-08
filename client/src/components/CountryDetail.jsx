import '../styles/CountryDetail.css'
import React from 'react';
import { connect } from 'react-redux';
import { getActivities, getCountryById } from '../redux/actionsBack';
import { cleanFilters, changeFlagReset, changeFlagActivity } from '../redux/actionsFront';

import { Link } from 'react-router-dom';
import { ActivityDetail } from './ActivityDetail';
import { IconContext } from 'react-icons/lib';
import { BsPeople } from "react-icons/bs";
import { TbChartAreaLine } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";

class CountryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: {},
            flag: false
        }
    }



    componentDidMount = async () => {
        const id = this.props.match.params.id;
        const country = await this.props.getCountryById(id)
        if (country) {
            this.setState(() => {
                return {
                    country: country,
                    flag: true
                }
            })
        }
    }

    componentDidUpdate = async () => {
        const id = this.props.match.params.id;
        if (this.state.flag && this.props.flagActivity === true) {
            const country = await this.props.getCountryById(id)
            this.setState(() => {
                return {
                    country: country,
                    flag: false
                }
            })
            this.props.changeFlagActivity(false)
            return
        }

        // if (this.props.flagActivity === true) {
        //     console.log("im here")
        //     const country = await this.props.getCountryById(id)
        //     this.setState(() => {
        //         return {
        //             country: country
        //         }
        //     })
        //     this.props.changeFlagActivity(false)
        //     return
        // }
    }




    handlerFlag = () => {
        this.props.changeFlagActivity(true)
        this.setState(() => {
            return {
                flag: true
            }
        })
    }


    clean = () => {
        cleanFilters()
        changeFlagReset(true)
    }


    render() {
        const { country } = this.state
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
                            <div className='col-lg-4 col-sm-12 align-self-center'><Link to="/addActivity" > <button className='btn btn-sm btn-outline-light' onClick={this.handlerFlag}>Add new activity</button></Link></ div>
                        </div>
                        {(country["activities"]?.length === 0) ?
                            <div><p className='activityDetail text-center'>This country doesn't have any activities</p></div> :
                            country["activities"]?.map(
                                (activity, index) =>
                                    <ActivityDetail idCountry={country.id}
                                        id={activity.id}
                                        name={activity.name}
                                        difficulty={activity.difficulty}
                                        duration={activity.duration}
                                        season={activity.season}
                                        review={activity.review}
                                        key={index}
                                        changeFlagActivity={changeFlagActivity}

                                    />
                            )
                        }
                    </div>
                    <div className='d-flex justify-content-center mt-2 mb-2'>
                        <Link className='btn btnContinent btn-sm btn-outline-light m-1' to="/" onClick={this.clean}>Back to Home</Link>
                    </div>
                </div>
            </div >
        )
    }
}




const mapStateToProps = (state) => {
    return {
        country: state.country,
        flagActivity: state.flagActivity
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getActivities: () => dispatch(getActivities()),
        getCountryById: (id) => dispatch(getCountryById(id)),
        cleanFilters: () => dispatch(cleanFilters()),
        changeFlagReset: () => dispatch(changeFlagReset()),
        changeFlagActivity: (boolean) => dispatch(changeFlagActivity(boolean))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);




