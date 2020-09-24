import "react-native-gesture-handler";
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
// import Toast from 'react-native-simple-toast';
import style from "../styles/Signin";
import { AUTH_TEXT_COLOR, THEME_COLOR } from "../components/colors";
import {
  AUTH_TOKEN,
  IS_SUPERHOST,
  PROFILE_IMAGE,
  USERNAME,
} from "../actions/actionTypes";
import { LOGOUT } from "../actions/actionTypes";
import Icon from "react-native-vector-icons/FontAwesome";
import Spinner from "react-native-loading-spinner-overlay";
import spinner_style from "../styles/spinner";
import { CheckBox } from "react-native-elements";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ham@test.com",
      // email: "jawad.sadiq@aldaimsolutions.com",
      pass: "123456",
      spinner: false,
      checked: false,
      // user_id: "",
    };
  }
  static navigationOptions = {
    title: "Super Host Login",
    headerTitleStyle: {
      fontSize: 22,
      textAlign: "center",
      flex: 1,
    },
  };
  componentDidMount = () => {
    this.addlistner = this.props.navigation.addListener("didFocus", () => {
      if (this.props.navigation.getParam("success")) {
        this.refs.toast.show("success", 2000);
      }
    });
  };
  componentDidUpdate() {
    if (this.props.connected === "false") {
      this.refs.toast.show("Internet Down", 2000);
    }
  }
  handleAction = (actionType, text = null) => {
    // return this.props.navigation.navigate('Events')
    // console.log(this.props.connected + "lk");
    switch (actionType) {
      case "EMAIL_INPUT":
        // var str = text;
        // str = str.replace(/\s/g, '');
        this.setState({ email: text.replace(/\s/g, "") });

        // console.log(this.state.email);
        break;
      case "PASSWORD_INPUT":
        this.setState({ pass: text });
        break;
      case "LOGIN":
        // this.props.navigation.navigate('App');
        this.setState({ spinner: true });
        if (this.state.email == "") {
          alert("Email Should Not Empty!");
          this.setState({ spinner: false });
          return;
        }
        if (this.state.password == "") {
          alert("Password Should Not Empty!");
          this.setState({ spinner: false });
          return;
        }
        axios
          .post("https://superhostapp.herokuapp.com/api/users/login", {
            user: {
              // "email": "rashid@gmail.com",
              // "password": "123456"
              email: this.state.email,
              password: this.state.pass,
            },
            timeout: 1000 * 3,
          })
          .then(async ({ data: response }) => {
            // console.log(response);
            if (response.error) {
              this.setState({ spinner: false });
              this.refs.toast.show(response.message, 2000);
              return;
            }
            if ((await AsyncStorage.getItem("url")) == null) {
              await AsyncStorage.setItem(
                "url",
                "https://superhostapp.herokuapp.com/api/"
              );
            }
            // if(await AsyncStorage.getItem('is_superhost') == null){
            await AsyncStorage.setItem(
              "is_superhost",
              response.is_superhost.toString()
            );
            // }

            // console.log(response.image)
            // this.setState({ user_id: response.id });

            await AsyncStorage.setItem("user_id", response.id.toString());

            this.props.setAuthToken(response.auth_token);
            this.props.profileImage(response.image);
            this.props.setUsername(response.username);
            this.props.setSuperhost(response.is_superhost);
            if (response.is_superhost == false) {
              this.props.navigation.navigate("UserApp");
            } else {
              this.props.navigation.navigate("HostApp");
            }
          })
          .catch((error) => {
            alert(error);
          });
        break;
      case "GO_TO_SIGNUP":
        this.props.navigation.navigate("signup");
        break;
      default:
        break;
    }
  };
  onPress = (text) => {
    switch (text) {
      case "Forget":
        this.props.navigation.navigate("forget");
        break;
      case "SignUp":
        this.props.navigation.navigate("signup");
        break;
      case "Login":
        this.props.navigation.navigate("profile");
        break;
      default:
        //do nothing
        break;
    }
  };
  // componentWillReceiveProps = (props) =>{
  //     console.log('dg')
  //     if(props.navigation.state.params){
  //         console.log('logout')
  //     }
  // }
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
        style={{ width: "100%", height: "100%", flex: 1 }}
      >
        <KeyboardAvoidingView style={{ flex: 0.7 }} behavior="padding" enabled>
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <SafeAreaView style={{ flex: 1 }}>
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
                  <View style={style.InputFile_container}>
                    <Icon
                      name="user"
                      size={18}
                      style={{ color: THEME_COLOR }}
                    />
                  </View>
                  <TextInput
                    value={this.state.email}
                    ref="email"
                    name="email"
                    onChangeText={(text) =>
                      this.handleAction("EMAIL_INPUT", text)
                    }
                    returnKeyType="next"
                    returnKeyLabel="next"
                    autoCapitalize="none"
                    placeholder="Email address"
                    placeholderTextColor={"white"}
                    onSubmitEditing={() => {
                      this.refs.pass.focus();
                    }}
                    style={style.field}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={style.InputFile_container}>
                    <Icon
                      name="lock"
                      size={18}
                      style={{ color: THEME_COLOR }}
                    />
                  </View>
                  <TextInput
                    ref="pass"
                    name="pass"
                    onChangeText={(text) =>
                      this.handleAction("PASSWORD_INPUT", text)
                    }
                    returnKeyType="done"
                    returnKeyLabel="done"
                    autoCapitalize="none"
                    placeholder="Password"
                    placeholderTextColor={"white"}
                    secureTextEntry
                    onSubmitEditing={() => {
                      this.handleAction("LOGIN");
                    }}
                    style={style.field}
                  />
                </View>
                <View style={{ paddingTop: 10, width: "86%" }}>
                  <TouchableOpacity onPress={() => this.onPress("Forget")}>
                    <Text
                      style={{
                        color: THEME_COLOR,
                        alignSelf: "flex-end",
                        fontSize: 16,
                      }}
                    >
                      Forget Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View
          style={{
            flex: 0.1,
            paddingHorizontal: 30,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require("../images/fb.png")}
              style={style.socialIcons}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require("../images/gmail.png")}
              style={style.socialIcons}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require("../images/linkedin.png")}
              style={style.socialIcons}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require("../images/insta.png")}
              style={style.socialIcons}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.handleAction("LOGIN")}
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
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.1,
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Have not account...{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("signup");
            }}
            activeOpacity={0.5}
          >
            <Text style={{ marginRight: 10, color: THEME_COLOR, fontSize: 18 }}>
              Sign Up here
            </Text>
          </TouchableOpacity>
        </View>
        <Toast ref="toast" position="top" positionValue={160} />
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
    profileImage: (uri) => {
      dispatch({ type: PROFILE_IMAGE, payload: uri });
    },
    setUsername: (username) => {
      dispatch({ type: USERNAME, payload: username });
    },
    setSuperhost: (status) => {
      dispatch({ type: IS_SUPERHOST, payload: status });
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
