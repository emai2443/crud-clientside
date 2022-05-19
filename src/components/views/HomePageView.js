import { Link } from "react-router-dom";

/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
const HomePageView = () => {
  // Render Home page view
  return (
    <div>
      <h1>Home Page</h1>
      <h2>
        <Link to="/campuses">
          <button>Campuses</button>
        </Link>
      </h2>

      <br />
      <h2>
        {" "}
        <Link to="/students">
          <button>Students</button>
        </Link>
      </h2>
    </div>
  );
};

export default HomePageView;
