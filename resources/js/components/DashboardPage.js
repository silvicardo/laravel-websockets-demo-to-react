import React, { Fragment } from 'react';
import Chat from './Chat';

const DashboardPage = (props) => {

  const backToHomepage = () => {

    //leave the chat if an Echo instance is available
    window.Echo && window.Echo.leave('chat') || null;

    props.history.push('/');

  }

  return (
      <Fragment>
        <div className="jumbotron">
          <h1>Welcome {props.user.name}</h1>
        </div>
        <p className="text-center">Enjoy your stay</p>
        <button className="btn btn-secondary btn-lg" onClick={backToHomepage}>Go Back to the Homepage </button>
        <Chat currentUser={props.user} token={props.token} />
      </Fragment>
    );

}

export default DashboardPage;
