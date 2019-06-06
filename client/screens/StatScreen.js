import React from 'react';
import {API_HOST} from 'react-native-dotenv';
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

export default class StatScreen extends React.Component{
  static navigationOptions = {
    title: 'ESTADISTICAS'
  };
  render (){
    return (
    <Text style={styles.developmentModeText}>HOLA</Text>
  );
}
}
const styles = StyleSheet.create({
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  }
});
