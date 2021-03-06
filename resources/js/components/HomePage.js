import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({isLoggedIn, currentUser, token}) => {

    console.log('HomePage props', {isLoggedIn, currentUser, token});

    //If the user is loggedIn provide a welcome alert
    let userFeedback;

    if(isLoggedIn){
      userFeedback = (
        <div className="alert alert-success" role="alert">
            <h3>You are currently logged in as {currentUser.name}</h3>
            <p>You have a token to "track your session"</p>
        </div>
      )
    } else {//if not invite him to do so
      userFeedback = (
        <div className="alert alert-warning" role="alert">
            <h3>You are not currently logged in</h3>
            <p>Log in to get an access token</p>
            <Link className="btn btn-primary btn-large" to="/login">Login</Link>
        </div>
      )
    }

    return (
      <Fragment>
        {userFeedback}
      </Fragment>
    );

}



export default HomePage;
