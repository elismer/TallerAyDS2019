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
import axios from "../utils/axios";
import { MonoText } from "../components/StyledText";

export default class AnswersScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const question = props.navigation.getParam("question");
    if (isEmpty(question)) {
      alert("Categoria Completada!");
      this.props.navigation.goBack();
    }
    this.state = {
      question: question,
      options: []
    };
    this.loadOptions(question.id);
  }

  render() {
    const { question, options } = this.state;
    this.shuffleArray(options);
    return (
      <View style={styles.container}>
        <Text style={styles.getStartedText}>{question.description}</Text>
        {options.map(option => (
          <Button
            key={option.id}
            onPress={this.onPressAnswerButton.bind(this, option)}
            title={option.description}
            color="#a4f590"
            accessibilityLabel="Learn more about this button"
          />
        ))}
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

  shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  logout: {
    fontSize: 14,
    color: "#2e78b7",
    textAlign: "center"
  }
});
