/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, removeStudent } = props;
  if (!student.campus) {
    return (
      <div>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <p>
          <span style={{ fontWeight: "500" }}>First Name: </span>
          {student.firstname}
        </p>
        <p>
          <span style={{ fontWeight: "500" }}>Last Name: </span>
          {student.lastname}
        </p>
        <p>
          <span style={{ fontWeight: "500" }}>Email: </span>
          {student.email}
        </p>
        <p>
          <span style={{ fontWeight: "500" }}>GPA: </span>
          {student.gpa}
        </p>

        <p>(Not Enrolled Currently)</p>
        <Link to={`/editstudent/${student.id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => removeStudent(student)}>Delete</button>
      </div>
    );
  }

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <p>
        <span style={{ fontWeight: "500" }}>First Name: </span>
        {student.firstname}
      </p>
      <p>
        <span style={{ fontWeight: "500" }}>Last Name: </span>
        {student.lastname}
      </p>
      <p>
        <span style={{ fontWeight: "500" }}>Email: </span>
        {student.email}
      </p>
      <p>
        <span style={{ fontWeight: "500" }}>GPA: </span>
        {student.gpa}
      </p>
      <p>
        <span style={{ fontWeight: "500" }}>Enrolled in</span>
        <br />
        <Link to={`/campus/${student.campus.id}`}>
          <h5>{student.campus.name}</h5>
        </Link>
      </p>
      <Link to={`/editstudent/${student.id}`}>
        <button>Edit</button>
      </Link>
      <button onClick={() => removeStudent(student)}>Delete</button>
    </div>
  );
};

export default StudentView;
