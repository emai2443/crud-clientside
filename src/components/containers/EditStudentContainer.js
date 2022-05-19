import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import EditStudentView from "../views/EditStudentView";
import { fetchStudentThunk, editStudentThunk } from "../../store/thunks";

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.student.firstname,
      lastname: this.props.student.lastname,
      email: this.props.student.email,
      imageUrl: this.props.student.imageUrl,
      gpa: this.props.student.gpa,
      campusId: this.props.student.campusId,
      redirect: false,
      redirectId: null,
    };
  }

  // Get Student data from the db using campus id
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }
  //handles any 'changed data' aka whats inputted
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log("changes have been made");
  };
  //handles data after submit button is pressed
  handleSubmit = async (event) => {
    //prevents page from refreshing after submitting
    event.preventDefault();
    let student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
      campusId: this.state.campusId,
    };
    //updates Student data in the db
    await this.props.editStudent(student, this.props.student.id);
    //updates state and redirects to show the new campus
    this.setState({
      redirect: true,
      redirectId: this.props.student.id,
    });
  };
  //unomunts when components is being removed from the DOM
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }
  //re renders the page by routing it to campus page
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }
    return (
      <div>
        <header />
        <EditStudentView
          student={this.props.student}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    editStudent: (student, id) => dispatch(editStudentThunk(student, id)),
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  };
};
// The following constructs the "connect" function used by EditCampusContainer to connect to Redux Store.
// Passing Redux Thunk (action creator) as props to the "connect" function
// The "mapDispatch" is to call the specific Thunk to dispatch its action.
const mapState = (state) => {
  return {
    student: state.student,
  };
};
// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);
