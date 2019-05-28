import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Login! </Text>

        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={(value) => this.setState({ username: value })}
          value={this.state.username}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => this.setState({ password: value })}
          value={this.state.password}
        />

        <Button title="Sign in!" onPress={this._signIn} />
      </View>
    );
  }

  _signIn = () => {
    const { username, password } = this.state;

    axios.post("http://192.168.0.183:4567/login", {
      username: username,
      password: password,
    }, {
      auth: {
        username: username,
        password: password
      }
    })
      .then(response => JSON.stringify(response))
      .then(response => {
        // Handle the JWT response here
        AsyncStorage.setItem('userToken', response.data);
        this.props.navigation.navigate('App');
      })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Username or Password incorrect");
        return;
      }

      alert("Networking Error");
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    margin: 15,
    height: 40,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4228F8'
  }
})
