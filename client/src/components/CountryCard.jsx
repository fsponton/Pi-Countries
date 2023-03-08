import '../styles//CountryCard.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class CountryCard extends React.Component {

    render() {
        return (
            <div className="countryCard d-flex flex-column align-items-center">
                <h3>{this.props.country}</h3>
                <Link to={`/countries/${this.props.id}`} >
                    <img src={this.props.img} alt={`flag ${this.props.country}`} />
                </Link>
                <p>{this.props.continent}</p>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        country: state.country
    }
}

export default connect(mapStateToProps, null)(CountryCard);
