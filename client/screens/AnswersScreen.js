import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import shuffle from "lodash/shuffle";
import axios from "../utils/axios";

export default class AnswersScreen extends React.Component {
  static navigationOptions = {
    title: "PREGUNTAS"
  };

  constructor(props) {
    super(props);
    const question = props.navigation.getParam("question");
    this.state = {
      question,
      options: [],
      optionCorrect: null,
      isPress: false
    };
    this.loadOptions(question.id);
  }

  render() {
    const { question, options, optionCorrect } = this.state;
    let optionsShuffle = shuffle(options);
    return (
      <View style={styles.container}>
        <View style={styles.answersContainer}>
          <Text style={styles.answersText}>{question.description}</Text>
        </View>
        <View>
          {optionsShuffle.map(option => (
            <View style={styles.buttonContainer} key={option.id}>
              <Button
                onPress={this.onPressAnswerButton(option)}
                title={option.description}
                style={
                  this.state.optionPress
                    ? styles.buttonStyle
                    : styles.buttonStyle
                }
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
      options.map(option => {
        if (option.type == "CORRECT") {
          let optionCorrect = option;
          this.setState({ options, optionCorrect });
        }
      });
    });
  };

  onPressAnswerButton = option => () => {
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
    color: "#121584",
    shadowOpacity: 0.5
  },
  buttonCorrectStyle: {
    borderRadius: 16,
    shadowRadius: 5,
    color: "#04B404",
    shadowOpacity: 0.5
  },
  buttonIncorrectStyle: {
    borderRadius: 16,
    shadowRadius: 5,
    color: "#DF0101",
    shadowOpacity: 0.5
  },
  buttonContainer: {
    margin: 5
  },
  answersContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#878787",
    padding: 65,
    borderRadius: 20,
    margin: 5
  },
  answersText: {
    fontSize: 30,
    color: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowRadius: 5,
    shadowOpacity: 1
  }
});
