import React, { Component } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  StatusBar,
  AsyncStorage,
  ImageBackground,
} from "react-native";
import axios from "react-native-axios";
import { connect } from "react-redux";
import Toast from "react-native-easy-toast";
import Spinner from "react-native-loading-spinner-overlay";
import spinner_style from "../styles/spinner";
import style from "../styles/Signin";
import { AUTH_TEXT_COLOR, THEME_COLOR } from "../components/colors";
import { AUTH_TOKEN } from "../actions/actionTypes";
import { LOGOUT } from "../actions/actionTypes";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      spinner: false,
      pass: "",
      checked: false,
    };
  }

  static navigationOptions = {
    title: "Forget Password",
    headerTitleStyle: {
      fontSize: 22,
      textAlign: "center",
      flex: 0.9,
    },
  };

  componentDidUpdate() {
    if (this.props.connected === "false")
      this.refs.toast.show(response.message, 2000);
  }
  handleAction = (actionType, text = null) => {
    switch (actionType) {
      case "EMAIL_INPUT":
        this.setState({ email: text });
        break;
      case "PASSWORD_INPUT":
        this.setState({ pass: text });
        break;
      case "RESET":
        if (this.state.email === "") {
          this.refs.toast.show(response.message, 2000);
          this.refs.email.focus();
          return;
        }
        this.setState({ spinner: true });
        axios
          .post("https://superhostapp.herokuapp.com/api/users/resetpassword", {
            user: {
              email: this.state.email,
              // "email": 'jawad.sadiq@aldaimsolutions.com',
            },
            timeout: 1000 * 3,
          })
          .then(async ({ data: response }) => {
            console.log(response);
            this.setState({ spinner: false });
            this.refs.toast.show(response.message, 2000);
            if (response.error) {
              this.setState({ spinner: false });
              this.refs.toast.show(response.message, 2000);
              return;
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "GO_TO_SIGNUP":
        this.props.navigation.navigate("signup");
        break;
      default:
        break;
    }
  };
  // componentWillReceiveProps = (props) =>{
  //     console.log('dg')
  //     if(props.navigation.state.params){
  //         console.log('logout')
  //     }
  // }
  componentWillMount = () => {
    console.log("dg");
    if (this.props.navigation.state.params) {
    }
  };
  onCheck = () => {
    if (this.state.checked == true) {
      this.setState({ checked: false });
    } else {
      this.setState({ checked: true });
    }
  };
  render() {
    return (
      <ImageBackground
        source={require("../../assets/splash.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <SafeAreaView style={{ flex: 0.85 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 0.3,
                  paddingTop: 80,
                }}
              >
                <Image
                  style={{ height: 130, width: "35%" }}
                  source={require("../images/signup.png")}
                />
              </View>
              <View style={style.fieldsContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      paddingTop: 35,
                      paddingVertical: 5,
                      paddingRight: 5,
                      borderBottomWidth: 1,
                      borderBottomColor: "#ededed",
                    }}
                  >
                    <Icon
                      name="mail-forward"
                      size={18}
                      style={{ color: THEME_COLOR }}
                    />
                  </View>
                  <TextInput
                    ref="email"
                    name="email"
                    onChangeText={(text) =>
                      this.handleAction("EMAIL_INPUT", text)
                    }
                    returnKeyType="done"
                    returnKeyLabel="done"
                    autoCapitalize="none"
                    placeholder="Email address"
                    placeholderTextColor={"white"}
                    onSubmitEditing={() => {
                      this.handleAction("RESET");
                    }}
                    style={style.field}
                  />
                </View>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.handleAction("RESET")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              backgroundColor: THEME_COLOR,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                paddingBottom: Platform.OS === "android" ? 12 : 20,
                paddingTop: Platform.OS === "android" ? 8 : 12,
              }}
            >
              <Icon name="check" size={20} style={{ color: "white" }} />
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <Toast ref="toast" position="bottom" positionValue={100} />
        {/* <StatusBar barStyle = "light-content" backgroundColor = "white" /> */}
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={spinner_style.spinnerTextStyle}
        />
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthToken: (token) => {
      dispatch({ type: AUTH_TOKEN, payload: token });
    },
    setRedux: (LOGOUT) => {
      dispatch({ type: LOGOUT });
    },
  };
};
const mapStateToProps = (state) => {
  return { connected: state.Connected };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
