import React from "react";
import {
  AsyncStorage,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableNativeFeedback
} from "react-native";
import isEmpty from "lodash/isEmpty";
import axios from "../utils/axios";

const data = [
  { key: "1" },
  { key: "2" },
  { key: "3" },
  { key: "4" },
  { key: "5" },
  { key: "6" }
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "CATEGORIAS"
  };

  onPressCategoryButton = category => () => {
    axios.get("/game/" + category).then(response => {
      let question = response.data;
      if (isEmpty(question)) {
        alert("Categoria Completada!");
      } else {
        this.props.navigation.navigate("Answers", { question });
      }
    });
  };

  renderItem({ item, index }) {
    return (
      <TouchableNativeFeedback
        onPress={this.onPressCategoryButton(item.key)}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.key}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.itemText, styles.titleText]}>
          Elija una categoria
        </Text>
        <FlatList
          data={formatData(data, numColumns)}
          numColumns={numColumns}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "center"
  },
  item: {
    backgroundColor: "#121584",
    borderRadius: 16,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
    flex: 10,
    margin: 10,
    height: Dimensions.get("window").width / numColumns
  },
  itemInvisible: {
    backgroundColor: "transparent"
  },
  itemText: {
    color: "#fff",
    fontSize: 40,
    textAlign: "center"
  },
  titleText: {
    color: "black",
    fontWeight: "bold"
  }
});
