import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import style from "../styles/Book";
import Field from "../components/ProfileField";
import CheckBox from "react-native-check-box";
import Button from "../components/Button";

export default class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      isLoading: false,
    };
  }

  componentDidMount() {}

  handleAction = (actionType, text = null) => {
    switch (actionType) {
      case "PHONE_INPUT":
        // console.log(text);
        break;
      case "BOOK":
        this.setState({ isLoading: true });
        break;
    }
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.fieldContainer}>
          <Field
            source={require("../images/username.png")}
            name="phone"
            inputAction={this.handleAction}
            actionType="PHONE_INPUT"
            placeholder="Phone Number"
            iconName="phone"
            type="Fontisto"
          />
        </View>
        <View style={style.appleHeading}>
          <Icon name="apple" type="font-awesome" size={28} />
          <Text style={{ fontSize: 28, paddingLeft: 5 }}>Apple Pay</Text>
        </View>
        <View style={style.infoContainer}>
          <Text style={{ fontSize: 33 }}>
            You will be billed once the SuperHost Confirms
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.setState({ check: !this.state.check })}
          style={style.checkboxContainer}
        >
          <CheckBox
            isChecked={this.state.check}
            onClick={() => this.setState({ check: !this.state.check })}
            style={{ opacity: 0.5 }}
          />
          <Text style={{ fontSize: 20, paddingLeft: 5 }}>
            I accept terms and conditions
          </Text>
        </TouchableOpacity>
        <View style={style.buttonContainer}>
          <Button
            isLoading={this.state.isLoading}
            handleAction={this.handleAction}
            actionType="BOOK"
            icon="check"
            text="Request To Book"
          />
        </View>
      </View>
    );
  }
}
