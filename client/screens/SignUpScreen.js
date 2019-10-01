import React from "react";
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import axios from "../utils/axios";
import { saveUser } from "../utils/auth";

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign up"
  };

  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      dni: "",
      username: "",
      password: "",
      year:""
    };
  }

  render() {
    return (
      <View style={styles.container}>
          <TextInput
            placeholder="Nombre"
            style={styles.input}
            onChangeText={value => this.setState({ first_name: value })}
            value={this.state.first_name}
          />
          <TextInput
            placeholder="Apellido"
            style={styles.input}
            onChangeText={value => this.setState({ last_name: value })}
            value={this.state.last_name}
          />
          <TextInput
            placeholder="DNI"
            style={styles.input}
            onChangeText={value => this.setState({ dni: value })}
            value={this.state.dni}
          />
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={value => this.setState({ username: value })}
            value={this.state.username}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
          />
          <TextInput
            placeholder="Year"
            style={styles.input}
            onChangeText={value => this.setState({ year: value })}
            value={this.state.year}
          />
          <View style={styles.buttonStyle}>
            <Button
              style={styles.buttonStyle}
              title="Registrarse"
              onPress={this._register}
            />
          </View>
      </View>
    );
  }

  _register = () => {
    const { first_name, last_name, dni, username, password, year } = this.state;

    axios
      .post(
        "/users",
        {
          first_name: first_name,
          last_name: last_name,
          dni: dni,
          username: username,
          password: password,
          year: year
        },
        {
          auth: {
          username: "admin",
          password: "admin"
          }
        }

      )

      .then(() => this.props.navigation.navigate("SignIn"));
      alert("Usuario creado con éxito");

  };
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#F5FCFF"
    },
    welcome: {
      fontSize: 20,
      textAlign: "center",
      margin: 10
    },
    input: {
      margin: 15,
      height: 40,
      padding: 5,
      fontSize: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#4228F8"
    },
    buttonStyle: {
      borderRadius: 16,
      shadowRadius: 5,
      shadowOpacity: 0.5
    }
  });
