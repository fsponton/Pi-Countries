import '../styles/ActivityDetail.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { deleteActivity, getActivities } from '../redux/actionsBack';
// import { changeFlagActivity } from '../redux/actionsFront'
import { connect } from 'react-redux'
import { AiOutlineDelete } from "react-icons/ai";
import { Redirect } from 'react-router'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IconContext } from 'react-icons/lib';
import { BsWatch } from "react-icons/bs";



export class ActivityDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirection: false
        };
    };



    handlerDelete = (e) => {
        e.preventDefault()
        const { idCountry, id, name } = this.props;
        const promise = deleteActivity(idCountry, id, name);
        if (promise) {
            this.setState({ ...this.state, redirection: true })
            this.props.changeFlagActivity(true)
        }
    }

    render() {
        const { redirection } = this.state
        const { idCountry, name, difficulty, duration, season, review } = this.props

        console.log(this.props)
        const arr = [1, 2, 3, 4, 5]

        if (redirection) { return <Redirect to={`/countries/${idCountry}`} />; }
        return (
            <div className="activityDetail row d-flex justify-content-center" >
                <div className="row" >
                    <div className='col-lg-3'> <p><span className='span'>Name</span> <br />{name}</p></div>

                    <div className='col-lg-3'>
                        <span className='span '>Difficulty </span> <br />
                        <div className='d-flex'> {
                            arr.map((index) => (
                                index <= difficulty ?
                                    <IconContext.Provider
                                        value={{ color: 'gold', size: '20px' }}
                                    >
                                        <div key={index}>
                                            <AiFillStar />
                                        </div>
                                    </IconContext.Provider> :
                                    <IconContext.Provider
                                        value={{ color: 'white', size: '20px' }}
                                    >
                                        <div key={index}>
                                            <AiOutlineStar />
                                        </div>
                                    </IconContext.Provider>

                            ))
                        } </div>

                    </div >
                    <div className='col-lg-3'> <p><span className='span'>Duration</span><br /> <BsWatch /> {duration} hour </p></div>
                    <div className='col-lg-3'> <p><span className='span'>Season</span><br />{season}</p></div>

                </div >
                <div className="row" >
                    <div className='col-lg-12'><p className='review'><span className='span'>Review:</span> <span className='review'>{review}</span></p></div>
                    <div className='d-flex justify-content-end'> <Link to="/"><button className='btn col-lg-12 btn-sm btn-outline-warning ' onClick={this.handlerDelete.bind(this)}> Delete Activity </button> </Link>  </div>
                </div>
                <AiOutlineDelete />
            </div >
        );
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getActivities: () => dispatch(getActivities())
        // changeFlagActivity: (boolean) => dispatch(changeFlagActivity(boolean))
    }
}

export default connect(null, mapDispatchToProps)(ActivityDetail);

