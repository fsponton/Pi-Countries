import '../styles//ActivityFormMultiple.css'
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { createActivity, getActivities, getAllCountries } from '../redux/actionsBack';
import { getallidCountries, cleanFilters } from '../redux/actionsFront';
import { Redirect } from 'react-router'

class ActivityFormMultiple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            difficulty: 0,
            duration: 0,
            season: "",
            idCountries: [],
            namesCountries: [],
            review: ""
        }
    };

    componentDidMount = async () => {
        await this.props.getAllCountries();
        await this.props.getallidCountries();
    }

    handlerClean = () => {
        this.setState({
            ...this.state,
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            idCountries: [],
            namesCountries: [],
            review: "",
            redirection: false
        })
    }

    handlerChangeName = (e) => {
        const { value } = e.target
        // const regExp = /^[\sa-zA-Z\s]+$/g;
        // if (!value.match(regExp)) {
        //     alert("Invalid name, use only a to z | A to Z");
        //     this.setState({
        //         ...this.state,
        //         name: ""
        //     })
        // }
        // else {
        this.setState({ ...this.state, name: value })
        // }
    }

    handlerReview = async (e) => {
        const { value } = e.target;
        this.setState({
            ...this.state,
            review: value
        })
    }



    handlerAddCountry = (e) => {
        const { value } = e.target
        const { countries } = this.props
        const country = countries.filter(country => {
            return country.id === value
        })
        if (this.state.idCountries.includes(value)) { return }

        this.setState({
            ...this.state,
            idCountries: [...this.state.idCountries, value],
            namesCountries: [...this.state.namesCountries, country[0].name]
        })
    }

    handlerDeleteCountry = (e) => {
        e.preventDefault();
        const countriesNames = this.state.namesCountries.filter(nameCountry => {
            return nameCountry !== e.target.value
        })
        this.setState({
            namesCountries: countriesNames
        })
    }


    handlerChange = async (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        // uso await para cuando cliqueo en select se guarde instantaneamente en el estado local y pueda enviar el dato completo. 
        await this.setState({
            ...this.state,
            [name]: value
        })
    }


    handlerSubmit = async (e) => {
        e.preventDefault();
        const { name, difficulty, duration, season, idCountries, review } = this.state;
        const promise = this.props.createActivity({ name, difficulty, duration, season, idCountries, review });
        this.handlerClean();

        if (promise) { this.setState({ ...this.state, redirection: true }) }
    }


    render() {
        const { name, difficulty, season, duration, namesCountries, review, redirection } = this.state
        const { storeIdCountries, countries } = this.props

        const allCountries = countries.map(country => {
            return { name: country.name, id: country.id }
        })



        const seasons = ["Summer", "Autumn", "Winter", "Spring"]
        const dificultad = [1, 2, 3, 4, 5]

        let arrDuration = [];
        for (let i = 0; i < 12; i++) { arrDuration.push(i) }

        if (redirection) { return <Redirect to={`/`} />; }


        return (
            <>
                <p className='createActivity'>Create Activity</p>
                <form className="formulario row g-2 " onSubmit={this.handlerSubmit}>
                    <div className='row justify-content-evenly'>
                        <div className='col-md-4 col-sm-12 m-1'>
                            <label htmlFor="name" className="form-label">
                                <p>Name</p>    </label>
                            <input className='form-control form-control-sm' id="name" type="text" value={name} onChange={this.handlerChangeName} required />

                        </div>
                        <div className='col-md-2 col-sm-3  m-1'>
                            <label htmlFor="difficulty" className="form-label">
                                <p>Difficulty</p></label>
                            <select className='form-select form-select-sm' name="difficulty" id="difficulty" value={difficulty} onChange={this.handlerChange} required>
                                <option className='option'>Select option...</option>
                                {dificultad.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className='col-md-2 col-sm-3 m-1 ps-5 pi-5'>
                            <label htmlFor="duration" className='form-label'>
                                <p>Hours</p>   </label>
                            <select className='form-select form-select-sm' name="duration" id="duration" value={duration} onChange={this.handlerChange} required>
                                <option> </option>
                                {arrDuration.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className='col-md-2 col-sm-3 m-1'>
                            <label htmlFor="season" className='form-label'>
                                <p>Season</p></label>
                            <select className='form-select form-select-sm' type="text" name="season" id="season" value={season} onChange={this.handlerChange} required>
                                <option> </option>
                                {seasons.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                        </div>
                        {/* <div className='col-lg-12 col-sm-12'> */}
                    </div>
                    <div className="reviewForm p-3">
                        <label className='form-label col-lg-2 col-sm-12' htmlFor="review"> <p>Review </p></label>
                        <textarea className='form-control  col-lg-8 col-sm-12' type="text" id="review" value={review} placeholder="Review" onChange={this.handlerReview} />
                    </div>


                    <div className='col-lg-2 col-md-12 col-sm-12 m-3'>
                        <label className='form-label ' htmlFor="countries">    <p>Select Countries to create activity:</p>   </label>
                        <select className='form-select form-select-sm  ' type="text" id="idCountries" name="countries" value={storeIdCountries} onChange={this.handlerAddCountry} required>
                            {allCountries.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='box col-lg-9 col-md-12 col-sm-12 m-3'>
                        <h2>Countries selected:</h2>
                        <div className='arrCountriesToCreate' >

                            {namesCountries.map((option, index) => (
                                <button className="btn btn-sm btn-outline-warning" key={index} value={option} onClick={this.handlerDeleteCountry}>   {option} X</button>
                            ))}

                        </div>

                    </div >
                    <div className='row m-1'>
                        <div className=' d-flex justify-content-between mt-3 mb-2'>
                            <button className='btn btn-sm btn-outline-warning' onClick={this.handlerClean}>Clear</button>
                            <button className='btn btn-sm btn-outline-success' type='submit'>Add Activity</button>
                        </div>
                    </div>

                </form >

                <div className='d-flex justify-content-center mt-3'>
                    <Link to="/"><button className='btn btn-sm btn-outline-light'>Back to Home</button></Link>
                </div>
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        country: state.country,
        countries: state.countries,
        storeIdCountries: state.storeIdCountries,
        activities: state.activities
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createActivity: (actividad) => dispatch(createActivity(actividad)),
        getAllCountries: () => dispatch(getAllCountries()),
        getallidCountries: () => dispatch(getallidCountries()),
        cleanFilters: () => dispatch(cleanFilters()),
        getActivities: () => dispatch(getActivities()),
        clearFilters: () => dispatch(cleanFilters())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFormMultiple);


