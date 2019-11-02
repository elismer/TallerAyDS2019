import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import '../styles/homeStyle.css';


class Home extends Component {
  render () {
    return (
      <div>
        <h1> ¡Bienvenido a Trivia Vet! </h1>
        <h1> Iniciar Sesion </h1>
        <p class="p1"><Link to="/SignIn" className="link">Iniciar Sesion</Link></p>
      </div>
    );
  }
}

export default Home;
