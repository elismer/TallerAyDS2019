import React from "react";
import { API_HOST } from "react-native-dotenv";
import {
  AsyncStorage,
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet
} from "react-native";
import axios from "../utils/axios";

export default class StatScreen extends React.Component {
  static navigationOptions = {
    title: "ESTADISTICAS"
  };

  constructor(props) {
    super(props);
    const stat = props.navigation.getParam("stat");
    this.state = {
      stat: stat
    };
  }
  render() {
    const { stat } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.developmentModeText}>Tus Estadisticas</Text>
        <TouchableNativeFeedback
        onPress={this.handleType("ALL")}>
          <Text style={styles.developmentModeText}>
            Respuestas Totales {stat.cant_total_questions}
          </Text>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
        onPress={this.handleType("CORRECT")}>
          <Text style={styles.developmentModeText}>
            Correctas {stat.cant_correct_questions}
          </Text>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
        onPress={this.handleType("INCORRECT")}>
          <Text style={styles.developmentModeText}>
            Incorrectas {stat.cant_incorrect_questions}
          </Text>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
        onPress={this.handleType("UNKNOWN")}>
          <Text style={styles.developmentModeText}>
            No respondidas {stat.cant_unknown_questions}
          </Text>
        </TouchableNativeFeedback>
      </View>
    );
  }

  handleType = type => async () => {
    await AsyncStorage.clear();
    axios.get("/record/" + type).then(response => {
      let options = response.data;
      this.props.navigation.navigate("Record", { options });
    });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "center"
  },
  developmentModeText: {
    marginBottom: 5,
    color: "rgba(0,0,0,0.4)",
    fontSize: 25,
    lineHeight: 25,
    textAlign: "center",
    fontWeight: "bold"
  }
});
