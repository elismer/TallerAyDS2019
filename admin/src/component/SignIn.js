import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import base64 from 'base-64';
import {AsyncStorage} from 'AsyncStorage';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {Username: '', Password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({Username: event.target.Username, Password: event.target.Password});
  }

  handleSubmit(event) {
        let base64 = require('base-64');

           let url = 'http://localhost:4567/login';
           let username = 'admin';
           let password = 'admin';

           let headers = new Headers();
        //   headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        //   headers.append('Content-Type', 'application/json; charset=UTF-8');
          headers.append('Accept', 'application/json');
          // console.log(base64.encode(username + ":" + password) + "*********");

        fetch('http://192.168.0.124:4567/loginAdmin', {

          method: 'POST',
          body: JSON.stringify({
            Username: this.state.Username,
            Password: this.state.Password,
            credentials: "include",
            mode: "cors" ,
            cache: 'default',
          }),
          headers: headers
        })
        .then(response => response.json())
        .then(json =>{

         console.log(json);
         AsyncStorage.setItem('userToken', json.Authorization);
         this.props.history.push('/Menu');
       });


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <br/>
        <label>
          Username:
          <input type="text" name="Username"  value={this.state.Username} onChange={this.handleChange} />
        </label>
        <br/>
        <label>
          Password:
          <input type="text" name="Password" value={this.state.Password} onChange={this.handleChange} />
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default SignIn;
