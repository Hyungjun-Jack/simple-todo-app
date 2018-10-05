import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput
} from "react-native";
import { ViewPagerAndroid } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
    toDoValue: ""
  };
  render() {
    const { isCompleted, isEditing, toDoValue } = this.state;
    const { text } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleCompleted}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.circleCompleted : styles.circleUncompleted
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.unFcompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controlInput}
              onBlur={this._endEditing}
              returnKeyType={"done"}
              autoCorrect={false}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.unFcompletedText
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._endEditing}>
              <View style={styles.actionsContainer}>
                <Text>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionsContainer}>
                <Text>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.actionsContainer}>
                <Text>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  _toggleCompleted = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };

  _startEditing = () => {
    const { text } = this.props;
    this.setState({
      isEditing: true,
      toDoValue: text
    });
  };

  _endEditing = () => {
    this.setState({
      isEditing: false
    });
  };

  _controlInput = text => {
    this.setState({
      toDoValue: text
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 10
  },
  circleCompleted: {
    borderColor: "#bbb"
  },
  circleUncompleted: {
    borderColor: "#F23657"
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#bbb"
  },
  uncompletedText: {
    color: "#353535"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width / 2
  },
  actions: {
    flexDirection: "row"
  },
  actionsContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    width: width / 2,
    marginVertical: 15,
    paddingBottom: 5
  }
});
