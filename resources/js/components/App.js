/**********************/
/* APP WITHOUT REDUX */
/**********************/

//React, React-> Component, ReactDOM
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
//React Router DOM
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Components
import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
import ErrorsAlert from './ErrorsAlert';
//Helpers
import * as axiosHelper from './helpers/axiosHelper';

/**********************/
/* MAIN APP COMPONENT */
/**********************/
/*
The App Component holds the highest level state.
Manages:
-> currentUser
-> userLoginStatus
-> currentUser token
-> errors(sent to descendant componenents for feedback)
*/

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoggedIn: false,
      currentUser: {},
      token: null,
      errors:[] //logout errors
    }

    //binding to preserve the context of this
    this.registrationSubmit = this.registrationSubmit.bind(this);
    this.logoutClicked = this.logoutClicked.bind(this);
    this.loginClicked = this.loginClicked.bind(this);

  }

  //callbacks will be used in the descendant component
  async registrationSubmit(formData, successCallback, errorCallback){

    console.log('formData', formData);

    try {

      const {data} = await axios.post('/api/register', {...formData});

      console.log(data);

      //data contains currentUser and token
      this.setState({ isLoggedIn: true, ...data }, () =>{
        successCallback();
      });

    } catch(error){

      console.log(error.response.data);

      errorCallback(error.response.data.errors);

    }

  }

  //callbacks will be used in the descendant component
  async logoutClicked(successCallback, errorCallback){

    try {

      const {data} = await axios(axiosHelper.getLogoutConfig(this.state.token));

      successCallback();

      this.setState({ isLoggedIn: false, currentUser: {}, token: null });

    } catch(error){

      errorCallback();

      console.log(error.response.data);

      this.setState({ errors: [error.response.data.message]});

    }

  }

  //callbacks will be used in the descendant component
  async loginClicked(formData,successCallback, errorCallback){

    try {

      const { data } = await axios(axiosHelper.getLoginConfig(formData));

      console.log('login response.data ', data);



      this.setState({ isLoggedIn: true, ...data }, () =>{
        successCallback();
      });

    } catch(error) {

      errorCallback( error && error.response.data || {error: "Unprocessable entity"});

    }

  }

  render(){

    console.log('AppComponent state ', this.state);

    //HANDLE INPUT ERRORS

    let userFeedback;

    if (this.state.errors.length !== 0) {

      userFeedback = (<ErrorsAlert {...this.state} />);

    }

    return(
      <Fragment>
        {/* NavBar receives appName from props, , loginStatus from State and logout function */}
        <Navbar
        isLoggedIn={this.state.isLoggedIn}
        logoutClicked={this.logoutClicked}
        appName={this.props.appName || 'Laravel WebSockets + React'}
        />
        <div className="container py-5">
          {userFeedback}
        <Switch>
          {/* HomePage receives the entireState to show user info(isLoggedIn, token) */}
          <Route
          exact path="/"
          render={(props) => (<HomePage {...this.state}/>)}
          />
          {/* LoginPage receives props to manage routing and login function */}
          <Route
          exact path="/login"
          render={(props) => (<LoginPage onLogin={this.loginClicked} {...props} />)}
          />
          {/* RegisterPage receives props to manage routing and register function */}
          <Route
          exact path="/register"
          render={(props) => (<RegisterPage onRegister={this.registrationSubmit} {...props}/>)}
          />
          {/* DashboardPage receives props to manage routing + the currentUser from the state */}
          <Route
          exact path="/dashboard"
          render={(props) => (<DashboardPage {...props} user={this.state.currentUser} token={this.state.token} />)}
          />
        </Switch>
        </div>
      </Fragment>
    )

  }

}

/***********************/
/* REACT-DOM -> RENDER */
/***********************/

if (document.getElementById('app')) {
    ReactDOM.render(
      <Router>
          <App appName="Laravel-Passport-Websocket+React" />
      </Router>
      , document.getElementById('app'));
}
