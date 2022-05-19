import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
import { deleteCampus } from '../../store/actions/actionCreators';

class EditCampusContainer extends Component {

    
    // Initialize state
    constructor(props){
      super(props);
      this.state = {
        name: this.props.campus.name, 
        imageUrl: this.props.campus.imageUrl,
        address: this.props.campus.address, 
        description: this.props.campus.description, 
        redirect: false, 
        redirectId: null
      };
    }

    // Get campus data from the db using campus id
    componentDidMount() {
        this.props.fetchCampus(this.props.match.params.id);
    }
    //handles any 'changed data' aka whats inputted
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("changes have been made");
    }
    //handles data after submit button is pressed
    handleSubmit = async event => {
        //prevents page from refreshing after submitting
        event.preventDefault();
        let campus = {
            name: this.state.name,
            imageUrl: this.state.imageUrl,
            address: this.state.address,
            description: this.state.description
        };
        console.log(`${campus.name}`);
        //updates campus data in the db 
        await this.props.editCampus(campus,this.props.campus.id);
        //updates state and redirects to show the new campus 
        this.setState({
            redirect: true,
            redirectId: this.props.campus.id
        });
    }
    //unomunts when components is being removed from the DOM
    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }
    //re renders the page by routing it to campus page
    render(){
        if(this.state.redirect){
            return ( <Redirect to={`/campus/${this.state.redirectId}`}/>)
        }
        return (
            <div>
                <header />
                <EditCampusView 
                    campus={this.props.campus}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

const mapDispatch = (dispatch) => {
      
    return({
        editCampus: (campus,id) => dispatch(editCampusThunk(campus,id)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    })
}
// The following constructs the "connect" function used by EditCampusContainer to connect to Redux Store.  
// Passing Redux Thunk (action creator) as props to the "connect" function
// The "mapDispatch" is to call the specific Thunk to dispatch its action.
const mapState = (state) => {
    return {
        campus: state.campus,
    };
};    
// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);