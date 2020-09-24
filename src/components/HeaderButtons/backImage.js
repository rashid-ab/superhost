import React, { Component } from "react";
import {
  View,
  Platform,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
class BackImage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log(this.props.navigation);
    return (
      <View>
        <TouchableOpacity
          style={Style.buttonContainer}
          activeOpacity={0.5}
          onPress={() => {
            if (this.props.is_superhost == true) {
              return this.props.navigation.navigate("HostInbox");
            }
            if (this.props.is_superhost == false) {
              if (this.props.is_userhost == true) {
                return this.props.navigation.navigate("UserHostInbox");
              } else return this.props.navigation.navigate("UserInbox");
            }
          }}
        >
          <Icon name={"chevron-left"} size={25} color={"white"} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  image: state.image,
  is_superhost: state.is_superhost,
  is_userhost: state.is_userhost,
});

export default connect(mapStateToProps)(BackImage);

const Style = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    paddingTop: Platform.OS === "ios" ? 8 : 10,
    marginLeft: 3,
  },
  image: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    paddingVertical: 10,
    height: 50,
    width: 50,
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 50 / 2,
  },
});
