import React, { Component } from "react";
import {
  View,
  Platform,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { DrawerActions } from "react-navigation";

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={Style.buttonContainer}
          activeOpacity={0.5}
          onPress={() => this.props.navigation.navigate("NewEvent")}
        >
          <Text style={{ fontSize: 32, color: "white", fontWeight: "bold" }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Style = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    marginRight: 5,
    paddingTop: Platform.OS === "android" ? 20 : 5,
    paddingBottom: Platform.OS === "android" ? 10 : 0,
  },
});
