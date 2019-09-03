import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Table, Row } from "react-native-table-component";
import axios from "../utils/axios";

export default class RecordScreen extends React.Component {
  static navigationOptions = {
    title: "HISTORIAL"
  };

  constructor(props) {
    super(props);
    const options = props.navigation.getParam("options");
    this.state = {
      options: options,
      tableHead: ["Pregunta", "Respuesta"],
      widthArr: [200, 200],
      questions: []
    };
    this.loadQuestions();
  }

  render() {
    const state = this.state;
    const tableData = [];
    const options = state.options;
    const questions = state.questions;
    if (!questions.length) {
      return null;
    }
    for (let i = 0; i < options.length; i++) {
      const rowData = [];
      const option = options[i];
      const id = option.question_id;
      const question = questions[id - 1];
      const description = question.description;
      rowData.push(description);
      rowData.push(option.description);
      tableData.push(rowData);
    }
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderColor: "#C1C0B9" }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderColor: "#C1C0B9" }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: "#F7F6E7" }
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }

  loadQuestions = async () => {
    axios.get("questions/options").then(response => {
      let questions = response.data;
      console.log(questions);
      this.setState({ questions });
    });
  };
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" }
});
