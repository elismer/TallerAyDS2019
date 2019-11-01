import React,{Component} from "react";
import { AsyncStorage } from 'AsyncStorage';

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {username: '',password: ''};

        this.handleChange = this.handleChange.bind(this);
      }

      handleChange(event) {
        this.setState({
          [event.target.name] : event.target.value
        });
      }



     login= async() => {
       console.log(this.state.username);
       console.log(this.state.password);
       let base64 = require('base-64');
        const h = new Headers();
        h.append('Accept', 'application/json');
        h.set('Authorization', 'Basic ' + base64.encode(this.state.username+ ":" +this.state.password));
         await fetch(process.env.REACT_APP_API_HOST+"/loginAdmin",{
              method: 'POST',
              headers:h,
              body: JSON.stringify({username: this.state.username, password: this.state.password}),
              mode:'cors',
              cache:'default',
            },)
            .then(response => {
                return response.json();
            })
            .then((res) => {
              console.log(res);
              AsyncStorage.setItem('userToken','Basic ' +base64.encode(res.username + ":" + res.password));
              this.props.history.push('/Menu');
            })
              .catch(error => {
                //agregar alerta
                console.log(error)
              });
      }

  render () {
        return (

          <div className="login-page">
            <div className="form">
              <form className="login-form" >
                <label>
                  <input type="text" placeholder="Nombre de usuario" name="username" value={this.state.username} onChange={this.handleChange} />
                </label>
                <label>
                  <input type="password" placeholder="Contraseña" name="password" value={this.state.password} onChange={this.handleChange} />
                </label>
                <p className="message">No tiene una cuenta? <a href="signUp">Crear cuenta</a></p>
              </form>
              <button onClick ={this.login}>
                iniciar sesion
                </button>
            </div>
          </div>
        );
  }
}


export default SignIn;
