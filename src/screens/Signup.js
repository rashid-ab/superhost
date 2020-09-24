import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Keyboard,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";
import axios from "react-native-axios";
import style from "../styles/Signup";
import { AUTH_TEXT_COLOR, THEME_COLOR } from "../components/colors";
import Toast from "react-native-easy-toast";
import { connect } from "react-redux";
import spinner_style from "../styles/spinner";
import {
  AUTH_TOKEN,
  PROFILE_IMAGE,
  USERNAME,
  IS_SUPERHOST,
} from "../actions/actionTypes";
import Icons from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Icon, CheckBox, Button } from "react-native-elements";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import Constants from "expo-constants";
import Spinner from "react-native-loading-spinner-overlay";
import DateTimePickerModal from "react-native-modal-datetime-picker";
var radio_props = [
  { label: "Drinking", value: "Drinking" },
  { label: "Outdoor", value: "Outdoor" },
  { label: "Fun", value: "Fun" },
  { label: "Travel", value: "Travel" },
  { label: "Dining", value: "Dining" },
  { label: "Sports", value: "Sports" },
  { label: "Others", value: "Others" },
  // { label: 'Others1', value: 'Others1' },
  // { label: 'Others2', value: 'Others2' },
  // { label: 'Others3', value: 'Others3' },
  // { label: 'Others4', value: 'Others4' },
  // { label: 'Others5', value: 'Others5' },
  // { label: 'Others6', value: 'Others6' },
];
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      bio: "",
      spinner: false,
      phone: "",
      address: "",
      dob: "",
      radioValue: "",
      isInterestModalVisible: false,
      isHobbyModalVisible: false,
      value: "",
      selecthobby: "",
      hobby: "",
      interest: "",
      isDatePickerVisible: false,
      is_superhost: false,
      image: [],
    };
  }
  // static navigationOptions = {
  //     title: 'Sign Up',
  //     headerTitleStyle: {
  //         fontSize: 22,
  //         textAlign:"center",
  //         flex:.8
  //       },
  //     headerStyle: {
  //         backgroundColor: THEME_COLOR,
  //         paddingTop:20,
  //         height:80,

  //     },
  // headerTransparent: {
  //     position: 'relative',
  //   },
  //   };

  componentDidUpdate() {
    if (this.props.connected === "false")
      this.refs.toast.show("response.msg", 2000);
  }

  handleAction = (actionType, text = null) => {
    switch (actionType) {
      case "NAME_INPUT":
        this.setState({ username: text });
        console.log(this.state.username);
        break;
      case "EMAIL_INPUT":
        this.setState({ email: text.replace(/\s/g, "") });
        // console.log(this.state.email)
        break;
      case "PASSWORD_INPUT":
        this.setState({ password: text });
        break;
      case "CONFIRM_PASSWORD_INPUT":
        this.setState({ confirm_password: text });
        break;
      case "HOBBY":
        this.setState({ hobby: text });
        console.log(this.state.hobby);
        break;
      case "ADDRESS":
        this.setState({ address: text });
        console.log(this.state.address);
        break;
      case "PHONE":
        this.setState({ phone: text });
        console.log(this.state.phone);
        break;
      case "BIO":
        this.setState({ bio: text });
        console.log(this.state.bio);
        break;
      // case "ADDHOBBY":
      //     this.setState({hobby:this.state.selecthobby,isHobbyModalVisible: !this.state.isHobbyModalVisible})
      //     break;
      case "DOB":
        this.setState({
          dob: text.toISOString().split("T")[0],
          isDatePickerVisible: false,
        });
        break;
      case "SHOW_DATE_PICKER":
        Keyboard.dismiss();
        this.setState({ isDatePickerVisible: true });
        break;
      case "HIDE_DATE_PICKER":
        this.setState({ isDatePickerVisible: false });
        break;
      case "SIGNUP":
        if (this.state.username === "") {
          this.refs.toast.show("Enter Your username!", 2000);
          return;
        }
        if (this.state.email === "") {
          this.refs.toast.show("Enter Your Email!", 2000);
          return;
        }
        if (this.state.password === "") {
          this.refs.toast.show("Enter Your Password!", 2000);
          return;
        }
        if (this.state.confirm_password === "") {
          this.refs.toast.show("Enter Your Confirm Password!", 2000);
          return;
        }
        if (this.state.confirm_password !== this.state.password) {
          this.refs.toast.show("Password Not Matched!", 2000);
          return;
        }
        if (this.state.dob === "") {
          this.refs.toast.show("Enter Your Date of Birth!", 2000);
          return;
        }
        if (this.state.phone === "") {
          this.refs.toast.show("Enter Your Phone Number!", 2000);
          return;
        }
        if (this.state.bio === "") {
          this.refs.toast.show("Enter Your Bio!", 2000);
          return;
        }
        if (this.state.address === "") {
          this.refs.toast.show("Enter Your Address!", 2000);
          return;
        }
        if (this.state.interest === "") {
          this.refs.toast.show("Enter Your interest!", 2000);
          return;
        }
        if (this.state.image.length === 0) {
          this.refs.toast.show("Add profile Image!", 2000);
          return;
        }
        this.setState({ spinner: true });
        var data = new FormData();
        data.append("username", this.state.username);
        data.append("email", this.state.email);
        data.append("password", this.state.password);
        data.append("date_of_birth", this.state.dob);
        data.append("is_superhost", this.state.is_superhost);
        data.append("location", this.state.address);
        data.append("phone", this.state.phone);
        data.append("hobbies", this.state.hobby);
        data.append("interest", this.state.interest);
        data.append("bio", this.state.bio);
        data.append("image", {
          uri: this.state.image.uri,
          name: "image",
          type: "image/png",
        });
        console.log(data);
        axios({
          method: "post",
          url: "https://superhostapp.herokuapp.com/api/users",
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(async ({ data: response }) => {
            //handle success
            console.log("this is heres", response);
            if (response.error == true) {
              this.setState({ spinner: false });
              // alert(response.message);
              this.refs.toast.show(response.message, 2000);
              // this.refs.toast.show('Create Event Successfully', 2000);
              return;
            }
            this.refs.toast.show(response.msg, 2000);
            if ((await AsyncStorage.getItem("url")) == null) {
              await AsyncStorage.setItem(
                "url",
                "https://superhostapp.herokuapp.com/api/"
              );
            }
            // if(await AsyncStorage.getItem('is_superhost') == null){
            //   return  console.log(response.user.image)
            // await AsyncStorage.setItem('is_superhost',response.user.is_superhost.toString());
            // }
            // this.props.setAuthToken(response.auth_token);
            this.props.profileImage(response.user.image.url);
            this.props.setUsername(response.username);
            this.props.setSuperhost(response.is_superhost);
            this.props.navigation.navigate("signin", {
              success: "You SignUp Successfully!",
            });
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });

        break;
      // case 'GO_TO_SIGNIN':
      //     this.props.navigation.navigate('signin')
      //     break;
      default:
        break;
    }
  };
  onCheck = () => {
    this.setState({ is_superhost: true });
  };
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  addPhoto = async () => {
    Keyboard.dismiss();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //   console.log(result)
    if (!result.cancelled) {
      let body = new FormData();
      if (!result.cancelled) {
        let file = /^.*\/(.*)\.(.*)$/g.exec(result.uri);
        body.append("image", {
          uri: result.uri,
          type: "image/*",
          name: file[1] + "." + file[2],
        });
        this.setState({ image: result });
        console.log(this.state.image.uri);
        // this.props.profileImage(result.uri);
      }
    }
  };
  onPress = (text) => {
    switch (text) {
      case "Interest Modal":
        Keyboard.dismiss();
        this.setState({ isInterestModalVisible: true });
        break;
      case "Hobby Modal":
        Keyboard.dismiss();
        this.setState({ isHobbyModalVisible: true });
    }
  };
  toggleModal = (text) => {
    switch (text) {
      case "Interest Modal":
        this.setState({
          isInterestModalVisible: !this.state.isInterestModalVisible,
          value: "",
        });
        break;
      case "Hobby Modal":
        this.setState({ isHobbyModalVisible: !this.state.isHobbyModalVisible });
    }
  };
  render() {
    return (
      <View style={style.container}>
        <Toast ref="toast" position="bottom" positionValue={50} />
        <View style={{ flex: 1 }}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => this.addPhoto()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 0.4,
                paddingTop: 50,
              }}
            >
              {this.state.image.length == 0 ? (
                <Image
                  style={style.profileImage}
                  source={require("../images/signup.png")}
                />
              ) : (
                <Image
                  style={style.profileImage}
                  source={{ uri: this.state.image.uri }}
                />
              )}
            </TouchableOpacity>
            <View style={style.fieldsContainer}>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                <View
                  style={{
                    paddingTop: 35,
                    paddingVertical: 5,
                    paddingRight: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ededed",
                  }}
                >
                  <Icons name="user" size={19} style={{ color: THEME_COLOR }} />
                </View>
                <TextInput
                  name="username"
                  onChangeText={(text) => this.handleAction("NAME_INPUT", text)}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoCapitalize="none"
                  value={this.props.username}
                  placeholder="User Name"
                  placeholderTextColor={"black"}
                  onSubmitEditing={() => {
                    this.refs.email.focus();
                  }}
                  style={style.field}
                />
              </View>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                <View
                  style={{
                    paddingTop: 35,
                    paddingVertical: 5,
                    paddingRight: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ededed",
                  }}
                >
                  <Icons
                    name="mail-forward"
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
                  value={this.state.email}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoCapitalize="none"
                  placeholder="Email address"
                  placeholderTextColor={"black"}
                  onSubmitEditing={() => {
                    this.refs.pass.focus();
                  }}
                  style={style.field}
                />
              </View>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                <View
                  style={{
                    paddingTop: 35,
                    paddingVertical: 5,
                    paddingRight: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ededed",
                  }}
                >
                  <Icons name="lock" size={18} style={{ color: THEME_COLOR }} />
                </View>
                <TextInput
                  ref="pass"
                  name="pass"
                  onChangeText={(text) =>
                    this.handleAction("PASSWORD_INPUT", text)
                  }
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoCapitalize="none"
                  placeholder="Password"
                  placeholderTextColor={"black"}
                  secureTextEntry
                  onSubmitEditing={() => {
                    this.refs.confirm_pass.focus();
                  }}
                  style={style.field}
                />
              </View>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                <View
                  style={{
                    paddingTop: 35,
                    paddingVertical: 5,
                    paddingRight: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ededed",
                  }}
                >
                  <Icons name="lock" size={18} style={{ color: THEME_COLOR }} />
                </View>
                <TextInput
                  ref="confirm_pass"
                  name="confirm_pass"
                  onChangeText={(text) =>
                    this.handleAction("CONFIRM_PASSWORD_INPUT", text)
                  }
                  returnKeyType="done"
                  returnKeyLabel="done"
                  autoCapitalize="none"
                  placeholder="Confirm Password"
                  secureTextEntry
                  placeholderTextColor={"black"}
                  onSubmitEditing={() => {
                    this.refs.dob.focus();
                  }}
                  style={style.field}
                />
              </View>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
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
                    name="date-range"
                    type="material"
                    size={18}
                    color={THEME_COLOR}
                  />
                </View>
                <TextInput
                  ref="dob"
                  name="dob"
                  onFocus={() => this.handleAction("SHOW_DATE_PICKER", null)}
                  value={this.state.dob}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoCapitalize="none"
                  placeholder="Date of  Birth"
                  placeholderTextColor={"black"}
                  style={style.field}
                />
                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => this.handleAction("DOB", date)}
                  onCancel={() => this.handleAction("HIDE_DATE_PICKER", null)}
                  date={new Date("1980-01-01")}
                />
              </View>

              <View style={{}}>
                <Modal isVisible={this.state.isInterestModalVisible} style={{}}>
                  <View style={{ flex: 0.53, backgroundColor: "white" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingTop: 15,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          position: "absolute",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: 60,
                            height: 40,
                            justifyContent: "flex-end",
                            paddingLeft: 10,
                          }}
                          onPress={() => {
                            this.toggleModal("Interest Modal");
                          }}
                        >
                          <Icon
                            name="chevron-left"
                            type="entypo"
                            size={25}
                            containerStyle={{
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                            }}
                            color={"black"}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>Interest</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      <RadioForm formHorizontal={true} animation={true}>
                        <ScrollView style={{ paddingHorizontal: 25 }}>
                          {radio_props.map((obj, i) => (
                            <RadioButton
                              labelHorizontal={true}
                              key={i}
                              style={{ marginTop: 8 }}
                            >
                              {/*  You can set RadioButtonLabel before RadioButtonInput */}
                              {/* <View style={{flexDirection:'row',paddingBottom:10}}> */}
                              <RadioButtonLabel
                                obj={obj}
                                index={i}
                                labelHorizontal={true}
                                labelStyle={{
                                  fontSize: 16,
                                  color: "black",
                                  width: "80%",
                                }}
                                onPress={() => {
                                  this.setState({ value: i });
                                }}
                                labelWrapStyle={{}}
                              />
                              {/* </View> */}
                              {/* <View style={{position:'absolute',right:-170,paddingBottom:10}}> */}
                              <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={this.state.value === i}
                                onPress={() => {
                                  this.setState({
                                    value: i,
                                    interest: obj.value,
                                    isInterestModalVisible: false,
                                  });
                                }}
                                borderWidth={1}
                                buttonInnerColor={THEME_COLOR}
                                buttonOuterColor={
                                  this.state.value === i ? "#2196f3" : "#000"
                                }
                                buttonSize={20}
                                buttonOuterSize={20}
                                buttonStyle={{ marginTop: 2 }}
                                buttonWrapStyle={{}}
                              />
                              {/* </View> */}
                            </RadioButton>
                          ))}
                        </ScrollView>
                      </RadioForm>
                    </View>
                  </View>
                </Modal>
              </View>

              {/* <View style={{  }}>
                                <Modal isVisible={this.state.isHobbyModalVisible} style={{}}>
                                    <View style={{ flex: .5 ,backgroundColor:'white'}}>
                                        <View style={{flexDirection:'row',paddingTop:20}}>
                                            <View style={{flexDirection:'row',position:'absolute',left:2,top:18}}>
                                                <TouchableOpacity style={{width:50,height:50}} onPress={() => {this.toggleModal('Hobby Modal')}}>
                                                    <Icon name="chevron-left" type="entypo" size={25} containerStyle={{justifyContent:'flex-start',alignItems:'flex-start'}} color={'black'} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                                <Text style={{fontSize:20}}>Add Hobby</Text>
                                            </View>
                                        </View>
                                        <View style={{marginTop:20,height:300}}>
                                        <View style={style.hobbyContainer}>
                                            <View style={{flexDirection: 'row'}} >
                                                <View style={{paddingTop: 35,paddingVertical: 5,paddingRight:5,borderBottomWidth:1,borderBottomColor:'#ededed'}}>
                                                <Icon name="clockcircle" type="antdesign" size={18} color={THEME_COLOR} />
                                                </View>
                                                <TextInput ref="hobby"   name="hobby" onChangeText={(text)=> this.handleAction('HOBBY', text)}  returnKeyType="next" returnKeyLabel="next" autoCapitalize='none' placeholder="Hobby" placeholderTextColor = {'black'}  style={style.field} />
                                            </View>
                                            <View style={{flexDirection: 'row',marginTop:20}} >
                                                {/* <TouchableOpacity activeOpacity={0.6} onPress={() => this.handleAction('ADDHOBBY')} style={{alignItems:'center',justifyContent:'center',width:'80%',backgroundColor:THEME_COLOR}}>
                                                    <Text style={{color:'white', fontSize: 16, paddingBottom: Platform.OS==='android'?12:20, paddingTop:Platform.OS==='android'?8:12}}><Icon name="check" size={20} style= {{color:'white'}} />Add Hobby</Text>
                                                </TouchableOpacity> */}
              {/* <Button
                                                    onPress={() => this.handleAction('ADDHOBBY')}
                                                    title="Add Hobby"
                                                    color={THEME_COLOR}
                                                    accessibilityLabel="Learn more about this purple button"
                                                    />
                                            </View> 
                                        </View>
                                    </View>
                                    </View>
                                </Modal> */}
              {/* </View> */}
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
                    name="clockcircle"
                    type="antdesign"
                    size={18}
                    color={THEME_COLOR}
                  />
                </View>
                <TextInput
                  onFocus={() => {
                    this.onPress("Interest Modal");
                  }}
                  name="interest"
                  value={this.state.interest}
                  autoCapitalize="none"
                  placeholder="Interests"
                  placeholderTextColor={"black"}
                  style={style.field}
                />
              </View>
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
                    name="clockcircle"
                    type="antdesign"
                    size={18}
                    color={THEME_COLOR}
                  />
                </View>
                <TextInput
                  ref="hobby"
                  onChangeText={(text) => this.handleAction("HOBBY", text)}
                  name="hobby"
                  value={this.state.hobby}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoCapitalize="none"
                  placeholder="Hobby"
                  placeholderTextColor={"black"}
                  style={style.field}
                />
              </View>
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
                    name="home"
                    type="font-awesome"
                    size={18}
                    color={THEME_COLOR}
                  />
                </View>
                <TextInput
                  ref="address"
                  onChangeText={(text) => this.handleAction("ADDRESS", text)}
                  name="address"
                  value={this.state.address}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoCapitalize="none"
                  placeholder="Address"
                  onSubmitEditing={() => {
                    this.refs.phone.focus();
                  }}
                  placeholderTextColor={"black"}
                  style={style.field}
                />
              </View>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
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
                    name="phone"
                    type="material"
                    size={18}
                    color={THEME_COLOR}
                  />
                </View>
                <TextInput
                  ref="phone"
                  name="phone"
                  keyboardType="numeric"
                  onChangeText={(text) => this.handleAction("PHONE", text)}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  autoCapitalize="none"
                  placeholder="Phone"
                  onSubmitEditing={() => {
                    this.refs.bio.focus();
                  }}
                  placeholderTextColor={"black"}
                  style={style.field}
                />
              </View>
              <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                <View
                  style={{
                    paddingTop: 35,
                    paddingVertical: 5,
                    paddingRight: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ededed",
                  }}
                >
                  <Icons name="user" size={18} style={{ color: THEME_COLOR }} />
                </View>
                <TextInput
                  ref="bio"
                  name="bio"
                  onChangeText={(text) => this.handleAction("BIO", text)}
                  returnKeyType="done"
                  returnKeyLabel="done"
                  autoCapitalize="none"
                  placeholder="Bio"
                  onSubmitEditing={() => {
                    this.refs.bio.focus();
                  }}
                  placeholderTextColor={"black"}
                  style={style.field}
                />
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  width: "95%",
                  flexDirection: "row",
                }}
              >
                <CheckBox
                  containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
                  title="I would like to be a Superhost"
                  checked={this.state.is_superhost}
                  onPress={() => this.onCheck()}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.15,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginBottom: 10,
              }}
            >
              {/* <TouchableOpacity activeOpacity={0.6} onPress={() => this.handleAction('SIGNUP')} style={{alignItems:'center',justifyContent:'center',width:'80%',backgroundColor:THEME_COLOR}}>
                                <Text style={{color:'white', fontSize: 16, paddingBottom: Platform.OS==='android'?12:20, paddingTop:Platform.OS==='android'?8:12}}><Icon name="check" size={20} style= {{color:'white'}} />Sign Up</Text>
                            </TouchableOpacity> */}
              <Button
                onPress={() => {
                  this.handleAction("SIGNUP");
                  console.log("i am clicked");
                }}
                title="SignUp"
                buttonStyle={{
                  backgroundColor: THEME_COLOR,
                  width: 300,
                }}
                icon={<Icon name="check" size={20} color="white" />}
              />
            </View>
            <Toast ref="toast" position="bottom" positionValue={50} />
          </ScrollView>
        </View>
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={spinner_style.spinnerTextStyle}
        />

        <StatusBar barStyle="white" backgroundColor={THEME_COLOR} />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    image: state.image,
    connected: state.Connected,
  };
};
export const mapDispatchToProps = (dispatch) => {
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
