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
import axios from "../utils/axios";
import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'CATEGORIAS'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.getStartedText}>Elige una categoria</Text>
        <Button
          style={styles.welcomeImage}
          onPress={this.onPressCategoryButton.bind(this, "1")}
          title="1"
          color="blue"
          accessibilityLabel="Learn more about this button"
        />

        <Button
          style={styles.welcomeImage}
          onPress={this.onPressCategoryButton.bind(this, "2")}
          title="2"
          color="red"
          accessibilityLabel="Learn more about this button"
        />

        <Button
          style={styles.welcomeImage}
          onPress={this.onPressCategoryButton.bind(this, "3")}
          title="3"
          color="brown"
          accessibilityLabel="Learn more about this button"
        />

        <Button
          style={styles.welcomeImage}
          onPress={this.onPressCategoryButton.bind(this, "4")}
          title="4"
          color="purple"
          accessibilityLabel="Learn more about this button"
        />

        <Button
          style={styles.welcomeImage}
          onPress={this.onPressCategoryButton.bind(this, "5")}
          title="5"
          color="orange"
          accessibilityLabel="Learn more about this button"
        />

        <Button
          style={styles.welcomeImage}
          onPress={this.onPressCategoryButton.bind(this, "6")}
          title="6"
          color="violet"
          accessibilityLabel="Learn more about this button"
        />
      </View>
    );
  }

  onPressCategoryButton = category => {
    axios.get("/game/" + category).then(response => {
      let question = response.data;
      this.props.navigation.navigate("Answers", { question });
    });
  };

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
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
