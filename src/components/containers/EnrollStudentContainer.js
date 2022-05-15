import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EnrollStudentView from "../views/EnrollStudentView";
import { fetchCampusThunk } from "../../store/thunks";
import { addStudentThunk } from "../../store/thunks";

class EnrollStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      campusId: this.props.match.params.id,
      imageUrl: "",
      gpa: 0.0,
      redirect: false,
      redirectId: this.props.match.id,
    };
  }
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
    console.log("componentDidMount: ", this.props.match.params.id);
  }
  // Capture input data when it is entered
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.
    let student;
    this.state.imageUrl === ""
      ? (student = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          gpa: this.state.gpa,
          campusId: this.state.campusId,
        })
      : (student = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          imageUrl: this.state.imageUrl,
          gpa: this.state.gpa,
          campusId: this.state.campusId,
        });

    await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      campusId: null,
      imageUrl: "",
      gpa: 0.0,
      redirect: true,
    });
  };

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EnrollStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          campus={this.props.campus}
        />
      </div>
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    addStudent: (student) => dispatch(addStudentThunk(student)),
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  };
};

const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapDispatch, mapState)(EnrollStudentContainer);
