/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { editCampus } from "../../store/actions/actionCreators";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, removeCampus, unenrollStudent } = props;

  // Render a single Campus view with list of its students
  if (!campus.students.length) {
    return (
      <div>
        <br />
        <br />
        <img src= {campus.imageUrl} alt="campus" style={{width: '100px', height: '100px', borderRadius: 50}}></img>
        <h1>{campus.name}</h1>
        <p>{campus.address}</p>
        <p>{campus.description}</p>
        {campus.students.map((student) => {
          let name = student.firstname + " " + student.lastname;
        })}
        <button onClick={() => removeCampus(campus.id)}>Delete</button>
        <Link to={`/editcampus/${campus.id}`}>
            <button>Edit</button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <button onClick={() => removeCampus(campus.id)}>
                Delete Campus
              </button>
      {campus.students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
            <button
              style={{ borderRadius: 10 }}
              onClick={() => unenrollStudent(student)}
            >
              Unenroll
            </button>
            <h3>Students Enrolled</h3>
            <Link to={`/editcampus/${campus.id}`}>
              <button>Edit</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;
