import React from "react";
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { WebBrowser } from "expo";
import isEmpty from "lodash/isEmpty";
import shuffle from "lodash/shuffle";
import axios from "../utils/axios";
import { MonoText } from "../components/StyledText";

export default class AnswersScreen extends React.Component {
  static navigationOptions = {
    title: "PREGUNTAS"
  };

  constructor(props) {
    super(props);
    const question = props.navigation.getParam("question");

    this.state = {
      question: question,
      options: []
    };
    this.loadOptions(question.id);
  }

  render() {
    const { question, options } = this.state;
    let optionsShuffle = shuffle(options);
    return (
      <View style={styles.container}>
        <View style={styles.answersContainer}>
          <Text style={styles.answersText}>{question.description}</Text>
        </View>
        <View>
          {optionsShuffle.map(option => (
            <View style={styles.buttonContainer}>
              <Button
                key={option.id}
                onPress={this.onPressAnswerButton.bind(this, option)}
                title={option.description}
                color="#121584"
                style={styles.buttonStyle}
                accessibilityLabel="Learn more about this button"
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  loadOptions = question_id => {
    axios.get("/options/" + question_id).then(response => {
      let options = response.data;
      this.setState({ options });
    });
  };

  onPressAnswerButton = option => {
    axios
      .post("/answers", {
        chosen_option: option.id
      })
      .then(response => {
        alert(option.type);
        axios.get("/game/" + this.state.question.category_id).then(response => {
          let question = response.data;
          if (!isEmpty(question)) {
            this.setState({ question });
            this.loadOptions(question.id);
          } else {
            alert("Categoria Completada!");
            this.props.navigation.goBack();
          }
        });
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  getStartedText: {
    fontSize: 17,
    color: "black",
    lineHeight: 24,
    textAlign: "center"
  },
  buttonStyle: {
    borderRadius: 16,
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  buttonContainer: {
    margin: 5,
  },
  answersContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    padding: 65,
    borderRadius: 20,
    margin: 5
  },
  answersText: {
    fontSize:30,
    color: "white",
    shadowColor: "#000",
    shadowOffset:{
      width:0,
      height: 9,
    },
    shadowRadius: 5,
    shadowOpacity: 1
  }


});
