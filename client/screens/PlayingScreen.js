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

export default class PlayingScreen extends React.Component{
  static navigationOptions = {
    title: 'JUEGO'
  };
  render (){
    const {navigation}= this.props;
    const data=navigation.getParam('description','No-question');
    return (
      <Text style={styles.developmentModeText}>
      Pregunta: {JSON.stringify(data)}</Text>
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
