import React, { Fragment } from 'react';
//withRouter gives us the ability to navigate
//even if the component is not within a Route
import { NavLink, withRouter } from 'react-router-dom';
import Echo from 'laravel-echo';

const Navbar = (props) => {

  const backToTheHomePage = () => {

    //leave the chat if an Echo instance is available
    window.Echo && window.Echo.leave('chat') || null;

    //and back to Homepage
    props.history.push('/');

  }

  const logoutBtnClicked = () => {

    //Perform Logout and then reach the homeepage anyway (success, fail)
    props.logoutClicked(backToTheHomePage,backToTheHomePage);
  }

  //SHOW LINKS based on userLogin status
  let authLinks;

  if (!props.isLoggedIn){//NOT LOGGED IN
    authLinks = (
      <Fragment>
        <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
      </Fragment>
    );
  } else {//LOGGED IN
    authLinks = (
      <Fragment>
        <NavLink className="nav-item nav-link" to="/Dashboard">Dashboard</NavLink>
        <button className="ml-5 btn btn-danger" onClick={logoutBtnClicked}>Logout</button>
      </Fragment>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">{props.appName}</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {authLinks}
        </div>
      </div>
    </nav>

  );

}

//passes match, history, location to Component
export default withRouter(Navbar);
