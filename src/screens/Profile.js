import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
} from "react-native";
// import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import MapSearch from "../components/MapSearch";
import axios from "react-native-axios";
import Toast from "react-native-easy-toast";
import style from "../styles/Profile";
import ProfileField from "../components/ProfileField";
import Button from "../components/Button";
import { PROFILE_IMAGE, USERNAME } from "../actions/actionTypes";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      bio: "",
      dob: "",
      phone: "",
      images: "",
      isDatePickerVisible: false,
      isLoading: false,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    };
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount = () => {
    // const { navigation } = this.props;
    // this.focusListener = navigation.addListener("didFocus", async () => {
    this.getProfile();
    // })
  };
  componentDidUpdate() {
    if (this.props.connected === "false")
      this.refs.toast.show(response.message, 2000);
  }
  getProfile = async () => {
    this.handleAction("GET_PERMISSION");
    let url = await AsyncStorage.getItem("url");
    console.log(url);
    axios({
      method: "get",
      url: url + "users/profile",
      headers: {
        Accept: "application/json",
        Authorization: this.props.auth_token,
      },
      timeout: 1000 * 3,
    })
      .then(({ data: response }) => {
        if (response.error == true) {
          this.refs.toast.show(response.message, 2000);
          return;
        }
        console.log(response);
        this.setState({
          username: response.username,
          email: response.email,
          bio: response.bio,
          dob: response.date,
          phone: response.phone,
        });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };
  handleAction = async (actionType, text = null) => {
    switch (actionType) {
      case "GET_PERMISSION":
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
          );
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
        break;
      case "ADD_PHOTO":
        Keyboard.dismiss();
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.image,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          let file = /^.*\/(.*)\.(.*)$/g.exec(result.uri);
          console.log(result);
          this.props.profileImage(result.uri);
          this.setState({
            images: { uri: result, name: file[1] + "." + file[2] },
          });
        }
        break;
      case "SAVE":
        this.setState({ isLoading: true });
        let url = await AsyncStorage.getItem("url");
        var data = new FormData();
        data.append("username", this.state.username);
        data.append("email", this.state.email);
        data.append("bio", this.state.bio);
        data.append("date_of_birth", this.state.dob);
        data.append("phone", this.state.phone);
        data.append("location", "Aldaim Solutions");
        if (this.state.images !== "") {
          data.append("image", {
            uri: this.props.image,
            name: this.state.images.name,
            type: "image/png",
          });
        }
        // return console.log(data)
        axios({
          method: "put",
          url: url + "users/update",
          data: data,
          headers: {
            Accept: "application/json",
            Authorization: this.props.auth_token,
            "Content-Type": "multipart/form-data",
          },
        })
          .then(({ data: response }) => {
            this.setState({ isLoading: true });
            console.log(response);
            if (response.error) {
              this.refs.toast.show(response.message, 2000);
              this.setState({ isLoading: false });
              return;
            }
            console.log(response);
            this.setState({
              username: response.username,
              email: response.email,
              bio: response.bio,
              dob: response.date,
              phone: response.phone,
              isLoading: false,
            });
            this.props.profileImage(response.image);
            this.props.setUsername(response.username);
            this.refs.toast.show(response.message, 2000);
          })
          .catch(function (response) {
            console.log(response);
          });
        break;
      case "REGION_CHANGE":
        this.setState({ region: text });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={style.container}>
          <KeyboardAvoidingView behavior="position" enabled>
            <TouchableOpacity
              onPress={() => this.handleAction("ADD_PHOTO")}
              style={style.imageContainer}
            >
              {this.props.image == "null" ? (
                <Image
                  style={style.profileIcon}
                  source={require("../images/signup.png")}
                />
              ) : (
                <Image
                  style={style.profileImage}
                  source={{ uri: this.props.image }}
                />
              )}
            </TouchableOpacity>
            <View style={style.fieldsContainer}>
              <ProfileField
                name="username"
                value={this.state.username}
                inputAction={(text) => this.setState({ username: text })}
                placeholder="User Name"
                onSubmitEditing={() => {
                  this.email.focus();
                }}
                keyboardType="default"
                iconName="user"
                type="font-awesome"
              />
              <ProfileField
                name="email"
                value={this.state.email}
                refs={(input) => {
                  this.email = input;
                }}
                inputAction={(text) => this.setState({ email: text })}
                placeholder="Email"
                onSubmitEditing={() => {
                  this.bio.focus();
                }}
                keyboardType="email-address"
                iconName="email"
                type="MaterialCommunityIcons"
              />
              <ProfileField
                name="bio"
                value={this.state.bio}
                refs={(input) => {
                  this.bio = input;
                }}
                inputAction={(text) => this.setState({ bio: text })}
                placeholder="BIO"
                onSubmitEditing={() => {
                  this.phone.focus();
                }}
                keyboardType="default"
                iconName="user"
                type="font-awesome"
              />
              <ProfileField
                name="phone"
                value={this.state.phone}
                refs={(input) => {
                  this.phone = input;
                }}
                inputAction={(text) => this.setState({ phone: text })}
                placeholder="Phone No"
                keyboardType="phone-pad"
                iconName="phone"
                type="Fontisto"
              />

              {/* <MapSearch /> */}
              {/* <ProfileField name="address" value={this.state.address} refs={(input)=>{this.address=input;}} inputAction={(text)=>this.setState({address: text})} placeholder='Address' onSubmitEditing={() => { this.handleAction("SHOW_DATE_PICKER", null) }} keyboardType="default" iconName="map-marker" type="Fontisto" /> */}
              {/* <ProfileField name="dob" refs={(input)=>{this.dob=input;}} inputAction={this.handleAction} actionType='DOB_INPUT' disable={true} placeholder='Date Of Birth' onSubmitEditing={() => { this.phone.focus()}}keyboardType="default" /> */}
              <TouchableOpacity
                onPress={() => this.setState({ isDatePickerVisible: true })}
                style={style.addressButton}
              >
                <Text style={{ fontSize: 14 }}>
                  {this.state.dob
                    ? "Date of Birth: " + this.state.dob
                    : "Select Date of Birth"}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={(date) => {
                  if (
                    new Date(date.toISOString().split("T")[0]) >
                      new Date("1980-01-01") &&
                    new Date(date.toISOString().split("T")[0]) <
                      new Date(new Date().getFullYear().toString() + "-01-01")
                  ) {
                    // console.log(this.state.dob);
                    this.setState({
                      dob: date.toISOString().split("T")[0],
                      isDatePickerVisible: false,
                    });
                  } else {
                    // console.log(
                    //   "Date should be valid for date of birth...",
                    //   new Date(date.toISOString().split("T")[0]) <
                    //     new Date(
                    //       new Date().getFullYear().toString() + "-01-01"
                    //     ),

                    //   new Date(date.toISOString().split("T")[0]),
                    //   "== < ==",
                    //   new Date(new Date().getFullYear().toString() + "-01-01")
                    // );
                    Alert.alert(
                      date.toISOString().split("T")[0] +
                        " is not a valid for date of birth..."
                    );
                  }
                }}
                onCancel={() => this.setState({ isDatePickerVisible: false })}
                date={new Date("1980-01-01")}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={style.BottomContainer}>
            <View style={style.mapContainer}>
              {/* { <MapView style={style.map}
                ref="map"
                initialRegion={this.state.region}
                // onRegionChange={(pos)=>{this.onRegionChange(pos)}}
                onRegionChangeComplete={(pos)=>{this.handleAction('REGION_CHANGE', pos)}}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
              >
                <Marker ref={ref => { this.mark = ref; }} coordinate={this.state.marker} title={"Event Title"} >
                  <Callout tooltip={true} style={style.callout}>
                    <Text style={{color: 'white', fontSize: 12, paddingHorizontal: 8}}>Event Title</Text>
                  </Callout>
                </Marker>
              </MapView> } */}
            </View>
            <TouchableOpacity style={style.addressButton}>
              <Text style={{ fontSize: 14 }}>Address</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={style.reviewContainer}>
              <Text style={{fontSize: 16}}>Reviews</Text>
              <View style={style.reviewRow}>
                <Image source={require('../images/signup.png')} style={style.reviewImage} />
                <View style={{flexDirection: 'column', justifyContent: 'center', width: '90%', paddingLeft: 5, paddingBottom: 10}}>
                  <Text style={{fontSize: 12, color: 'blue'}}>Name</Text>
                  <Text numberOfLines={50} style={{fontSize: 10}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
                </View>
              </View>
            </TouchableOpacity> */}
            <View style={{ marginVertical: 30, width: "100%" }}>
              <Button
                isLoading={this.state.isLoading}
                handleAction={this.handleAction}
                actionType="SAVE"
                icon="check"
                text="Save"
              />
            </View>
          </View>
          <Toast ref="toast" position="top" positionValue={50} />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = (state) => ({
  image: state.image,
  auth_token: state.auth_token,
  connected: state.Connected,
  is_superhost: state.is_superhost,
});
const mapDispatchToProps = (dispatch) => {
  return {
    profileImage: (uri) => {
      dispatch({ type: PROFILE_IMAGE, payload: uri });
    },
    setUsername: (username) => {
      dispatch({ type: USERNAME, payload: username });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
