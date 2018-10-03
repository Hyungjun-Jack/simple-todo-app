import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { ViewPagerAndroid } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._toggleCompleted}>
          <View
            style={[
              styles.circle,
              this.state.isCompleted
                ? styles.circleCompleted
                : styles.circleNotCompleted
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Hello, I'm a To Do</Text>
      </View>
    );
  }

  _toggleCompleted = () => {
    this.setState(prevState => {
        return {
            isCompleted: !prevState.isCompleted
        }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center"
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
  circleNotCompleted: {
    borderColor: "#F23657"
  }
});
