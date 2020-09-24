import React, { Component } from "react";
import { View } from "react-native";
import { IS_SUPERHOST, IS_USERHOST } from "../actions/actionTypes";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInterestModalVisible: true,
    };
  }
  componentDidMount = () => {
    this.listner = this.props.navigation.addListener("didFocus", () => {
      if (this.props.is_superhost == false) {
        // console.log(this.props.navigation.state.routeName);
        this.props.navigation.navigate("HostDraw");
        this.props.setSuperhost(true);
        this.props.setUserhost(false);
        return;
      }
      if (this.props.is_superhost == true) {
        //  console.log(this.props.navigation.state.routeName);
        this.props.navigation.navigate("userTab");
        this.props.setSuperhost(false);
        this.props.setUserhost(true);
        return;
      }
    });
  };
  componentWillUnmount = () => {
    this.listner.remove();
  };
  render() {
    return <></>;
  }
}
const mapStateToProps = (state) => {
  return { is_superhost: state.is_superhost, is_userhost: state.is_userhost };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSuperhost: (data) => {
      dispatch({ type: IS_SUPERHOST, payload: data });
    },
    setUserhost: (data) => {
      dispatch({ type: IS_USERHOST, payload: data });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Modals));
