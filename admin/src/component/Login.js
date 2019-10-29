import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.Login = this._Login.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.username, password: event.target.password});
  }

  _Login(){
    console.log("Entre");
    const usuario = {
      username:this.state.username,
      password : this.state.password
    };
    axios.post('http/192.168.0.124/4567/login',
      {
        usuario
      },
      {
        auth: {
          username:this.state.username,
          password:this.state.password
        }
      })
    .then (response => {
      console.log(this.state.username);
      console.log(response);
      console.log(this.state.username);
    });
  }



  render() {
    return (
      <form>
        <label>
          Username:
          <input type="text" username={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type="password" password={this.state.password} onChange={this.handleChange} />
        </label>
        <button onClick= {this._Login}> Iniciar Sesion
        </button>
      </form>
    );
 }
}
export default Login;
