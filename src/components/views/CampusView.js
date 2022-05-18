/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteCampus, editCampus, unenrollStudent } = props;

  // Render a single Campus view with list of its students
  if (!campus.students.length) {
    return (
      <div>
        <h1>{campus.name}</h1>
        <p>{campus.address}</p>
        <p>{campus.description}</p>
        {campus.students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <button onClick={() => deleteCampus(campus.id)}>
                Delete Campus
              </button>
              <p>There are currently no students enrolled in the campus</p>
              <Link to={`/enrollstudent/${campus.id}`}>
                <button>Enroll</button>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
            <button onClick={() => deleteCampus(campus.id)}>
              Delete Campus
            </button>
            <button style={{ borderRadius: 10 }} onClick={() => unenrollStudent(student)}>
                        Unenroll
                      </button>
            <h3>Students Enrolled</h3> 
            <button onClick={() => editCampus(campus.id)}>Edit Campus</button>
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;