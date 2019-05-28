import React from 'react';
import { Text } from 'react-native';

export default class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <Text> other screen </Text>
    );
  }
}
