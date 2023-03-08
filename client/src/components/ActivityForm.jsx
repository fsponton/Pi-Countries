import '../styles//ActivityForm.css'
import React from 'react'
import { connect } from 'react-redux'
import { createActivity } from '../redux/actionsBack'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'


class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            idCountries: this.props.country.id,
            namesCountries: [],
            review: "",
            redirection: false,
            nameCountry: this.props.country.name
        };
    };




    handlerClean = (e) => {
        this.setState({
            ...this.state,
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            idCountries: [],
            namesCountries: [],
            review: ""
        })
    }


    handlerReview = async (e) => {
        const { value } = e.target;
        this.setState({
            ...this.state,
            review: value
        })
    }


    handlerChangeName = (e) => {
        const { value } = e.target
        const regExp = "^[ a-zA-Z ]+$"
        if (!value.match(regExp)) {
            alert("nombre invalido");
            this.setState({
                ...this.state,
                name: ""
            })
        }
        else {
            this.setState({ ...this.state, name: value })
        }
    }

    handlerChange = (e) => {
        const { value, name } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }


    handlerSubmit = (e) => {
        e.preventDefault();
        // this.props.changeFlagActivity(true)
        this.setState({
            ...this.state,
            idCountries: [...this.state.idCountries, this.props.country.id]
        })


        const { name, difficulty, duration, season, idCountries, review } = this.state;

        const promise = this.props.createActivity({ name, difficulty, duration, season, idCountries, review });
        if (promise) { this.setState({ ...this.state, redirection: true }) }

    }

    render() {
        // console.log("tuki" + this.state.idCountries)
        const { name, difficulty, season, duration, review, idCountries, redirection, nameCountry } = this.state
        const seasons = ["Summer", "Autumn", "Winter", "Spring"]
        const dificultad = [1, 2, 3, 4, 5]





        let arrDuration = [];
        for (let i = 0; i < 24; i++) { arrDuration.push(i) }

        if (redirection) { return <Redirect to={`/countries/${idCountries}`} />; }

        return (
            <>
                <p className='createActivity'>Create Activity for {nameCountry} </p>
                <div className=''>
                    <form className="formulario row g-2 justify-content-evenly" onSubmit={this.handlerSubmit}>
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
                        <div className="reviewForm row ">
                            <label className='form-label col-lg-2 col-sm-12' htmlFor="review"> <p>Review </p></label>
                            <textarea className='form-control col-lg-10 col-sm-12' type="text" id="review" value={review} placeholder="Review" onChange={this.handlerReview} />

                            <div className=' d-flex justify-content-between m-2'>
                                <button className='btn btn-sm btn-outline-warning' onClick={this.handlerClean}>Clear</button>
                                <button className='btn btn-sm btn-outline-success' type='submit'>Add Activity</button>
                            </div>
                        </div>

                        {/* 
                        <div className='d-flex justify-content-end mb-3'>
                            <button className='btn btn-sm btn-outline-success' type="submit">Add Activity</button> */}
                        {/* <button className='btn btn-sm btn-outline-warning ms-2' onClick={this.handlerClean}>Clear Filters</button> */}
                        {/* </div> */}

                    </form >
                    <div className='d-flex justify-content-center mt-2'>
                        <Link to="/"><button className='btn btn-sm btn-outline-light'>Back to Home</button></Link>
                    </div>
                    {/* <div> */}
                    {/* <Link to="/home"><button className='btnAction'>Back to Home</button></Link> */}
                    {/* </div> */}
                </div >
            </>
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
        createActivity: (actividad) => dispatch(createActivity(actividad))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);


