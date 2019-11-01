
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './component/Home';
import SignIn from './component/SignIn';
import Menu from './component/Menu';
import Question from './component/Question';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Redirect
            from="/"
            to="/home" />
          <Switch>
            <Route
              path="/home"
              component={Home} />
            <Route
              path="/SignIn"
              component={SignIn} />
            <Route
              path="/menu"
              component={Menu} />
            <Route
              path= "/Question"
              component={Question}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
