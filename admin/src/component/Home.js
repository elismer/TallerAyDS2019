import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';


class Home extends Component {
  render () {
    return (
      <div>
        <h1> ¡Bienvenido! </h1>
        <h1> Iniciar Sesion </h1>
        <Link to="/login" className="link">Iniciar Sesion</Link>
      </div>
    );
  }
}

export default Home;
