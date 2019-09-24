import React from "react";
import{
    StyleSheet,
    Text,
    View,
    Button
} from "react-native"
export default class ResultScreen extends React.Component{
    static navigationOptions = {
        title: "RESULTADO"
    };

    constructor(props) {
        super(props);
        const option = props.navigation.getParam("option");
        const optionCorrect = props.navigation.getParam("optionCorrect");
        this.state = {
          option: option,
          optionCorrect: optionCorrect
        };
    }

    render() {
      const { optionCorrect, option } = this.state;
      return (
        <View style={styles.container}>
          <View style={styles.answersContainer}>
            <Text style={styles.answersText}>"Respuesta "{option}</Text>
          </View>
          <View>
          <Text style={styles.answersText}>"Respuesta "{optionCorrect}</Text>
          </View>
          <Button
            title="Volver a Home"
            style={styles.buttonStyle}
            onPress={this.props.navigation.navigate("Home")}
          />
          <Button
            title="Seguir Jugando"
            style={styles.buttonStyle}
            onPress={this.props.navigation.goBack()}
          />
        </View>
      );
    }

    
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
      backgroundColor: "#878787",
      padding: 65,
      borderRadius: 20,
      margin: 5,
      
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