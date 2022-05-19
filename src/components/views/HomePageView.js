import { Link } from "@material-ui/core";

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
      <Link to={`/campuses`}>
        <button>Campuses</button>
      </Link>
      <br />
      <Link to={`/students`}>
        <button>Campuses</button>
      </Link>
    </div>
  );
};

export default HomePageView;
