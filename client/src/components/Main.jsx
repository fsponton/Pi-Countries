import '../styles/Main.css';
import React from 'react';
import { connect } from 'react-redux';
import { getAllCountries, getActivities } from '../redux/actionsBack';
import { cleanFilters, getallidCountries, changeFlag, changeFlagReset } from '../redux/actionsFront';
import { CountryCard } from './CountryCard';
import Paging from './Paging';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageOne: 1,
            currentPage: 1,
            countriesPerPage: 9,
            pageNumbersHome: this.props.pageNumbers,
            selectedPage: 1,
            flag2: false
        };
    };

    componentDidMount = async () => {
        await this.props.getAllCountries();
        await this.props.getActivities();
        await this.props.getallidCountries();
    }


    componentDidUpdate() {
        if (this.props.flag === false && this.state.flag2 === true) {
            this.setState(() => {
                return {
                    currentPage: this.state.pageOne,
                    selectedPage: this.state.pageOne,
                    flag2: false
                }
            })
        } else if (this.props.flag === true && this.state.flag2 === false) {
            this.setState(() => {
                return {
                    currentPage: this.state.pageOne,
                    selectedPage: this.state.pageOne,
                    flag2: true
                }
            })
        } else if (this.props.flag === false && this.state.flag2 === false && this.props.flagReset === true) {
            this.props.changeFlagReset()
            this.setState(() => {
                return {
                    currentPage: this.state.pageOne,
                    selectedPage: this.state.pageOne
                }
            })
        }
    }

    updateCurrentPage = (e) => {
        const { name } = e.target;
        const { currentPage } = this.state
        const max = Math.max(...this.props.pageNumbers)
        const min = Math.min(...this.props.pageNumbers)


        if (name === "next") {
            if (currentPage === max) {
                return
            }
            let page = currentPage + 1
            this.setState(() => {
                return {
                    currentPage: page,
                    selectedPage: page
                }
            })
        } else if (name === "prev") {
            if (currentPage === min) {
                return
            }
            let page = currentPage - 1
            this.setState(() => {
                return {
                    currentPage: page,
                    selectedPage: page
                }
            })
        } else {
            this.setState(() => {
                return {
                    currentPage: Number(e.target.id),
                    selectedPage: Number(e.target.id)
                }
            })
        }
    }

    updateCountriesPerPage(n) {
        this.setState(() => {
            return {
                countriesPerPage: n
            }
        })
    }

    handleClick = async (e) => {
        await this.updateCurrentPage(e);
        if (this.props.flag === true && this.state.flag2 === false) {
            console.log(this.state)
            this.setState(() => {
                return {
                    currentPage: this.state.currentPage - (this.state.currentPage - 2),
                    selectedPage: this.state.currentPage - (this.state.currentPage - 2),
                    flag2: true
                }
            })
            return
        }
    }

    render() {
        const { countriesFiltered, countries, pageNumbers } = this.props
        const { countriesPerPage } = this.state
        let { currentPage, selectedPage } = this.state

        const indexOfLastAllCountries = currentPage * countriesPerPage;
        const indexOfFirstAllCountries = indexOfLastAllCountries - countriesPerPage;

        let currentCountries = []

        countriesFiltered?.length > 0 ?
            currentCountries = countriesFiltered
            : currentCountries = countries



        currentCountries = currentCountries.slice(indexOfFirstAllCountries, indexOfLastAllCountries);
        return (
            <>
                <div className='countries row'>
                    {(currentCountries[0] === "No hay paises con esa actividad") ?
                        <div><p className='noCountries'>No hay paises con esa actividad en el continente filtrado</p></div> :
                        currentCountries?.map(
                            (country, index) =>
                                <div key={index} className="col-lg-4  col-md-6 col-sm-6 ">
                                    <CountryCard
                                        id={country.id}
                                        img={country.flags}
                                        country={country.name}
                                        continent={country.continent}
                                        key={index}
                                    />
                                </div>
                        )}
                </div>
                <div className='pagination mb-4 d-flex justify-content-center mt-3'>
                    <button className='btn btn-sm btn-outline-primary' type='button' name="prev" onClick={this.handleClick}>Prev</button>
                    <Paging pageNumbers={pageNumbers} handleClick={this.handleClick} selectedPage={selectedPage} />
                    <button className='btn btn-sm btn-outline-primary' type='button' name="next" onClick={this.handleClick}>Next</button>
                </div>
            </>
        );
    };
};

//provider trae el store, con mapstate to props se pone el estado del store, que es una copia, en la props del componente
const mapStateToProps = (state) => {
    return {
        countries: state.countries,
        countriesFiltered: state.countriesFiltered,
        activities: state.activities,
        pageNumbers: state.pageNumbers,
        flag: state.flag,
        flagReset: state.flagReset
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCountries: () => dispatch(getAllCountries()),
        getActivities: () => dispatch(getActivities()),
        getallidCountries: () => dispatch(getallidCountries()),
        cleanFilters: () => dispatch(cleanFilters()),
        changeFlag: () => dispatch(changeFlag()),
        changeFlagReset: () => dispatch(changeFlagReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);







