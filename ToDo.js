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
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      toDoValue: props.text
    };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    //completeToDo: PropTypes.func.isReruired,
    //uncompleteToDo: PropTypes.func.isReruired,
    //updateToDo: PropTypes.func.isReruired
  };

  render() {
    const { isEditing, toDoValue } = this.state;
    const {
      text,
      id,
      deleteToDo,
      completeToDo,
      uncompleteToDo,
      updateToDo,
      isCompleted
    } = this.props;
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
                isCompleted ? styles.completedText : styles.uncompletedText
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
            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
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
    const { completeToDo, uncompleteToDo, isCompleted, id } = this.props;
    if (isCompleted) uncompleteToDo(id);
    else completeToDo(id);
  };

  _startEditing = () => {
    this.setState({
      isEditing: true
    });
  };

  _endEditing = () => {
    const { toDoValue } = this.state;
    const { updateToDo, id } = this.props;
    updateToDo(id, toDoValue);

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
    marginVertical: 20
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
