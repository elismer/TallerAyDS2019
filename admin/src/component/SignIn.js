import React,{Component} from "react";
import { AsyncStorage } from 'AsyncStorage';
import '../styles/signInStyle.css';

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
                alert("Usuario no autorizado");
                console.log(error)
              });
      }

  render () {
        return (

            <div className="login-page">
              <div className="form">
                <form className="login-form" >
                  <label class="sign-in">
                    <p> <input type="text" placeholder="Nombre de usuario" name="username" class="sign-in1" value={this.state.username} onChange={this.handleChange} /> </p>
                  </label>
                  <label>
                    <p> <input type="password" placeholder="Contraseña" name="password" class="sign-in2" value={this.state.password} onChange={this.handleChange} /> </p>
                  </label>
                </form>
              <button class="sign-in" onClick ={this.login}>
                  Iniciar sesion
              </button>
              </div>
            </div>
          
        );
  }
}


export default SignIn;
