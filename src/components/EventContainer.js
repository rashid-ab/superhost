import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { GROUP } from "../actions/actionTypes";
import {
  HEADING_FONT_COLOR,
  MESSAGE_FONT_COLOR,
  BADGE_COLOR,
  THEME_COLOR,
} from "../components/colors";
import axios from "react-native-axios";
import Toast from "react-native-easy-toast";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import { Rating, AirbnbRating, Icons } from "react-native-elements";

class EventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rating: 0,
      spinner: false,
      status: "",
      count: this.props.requests,
    };
  }

  rating(rating) {
    console.log("Rating is: " + rating);
    // this.setState({rating:rating})
  }

  JoinPressed = async () => {
    this.setState({ spinner: true });
    let url = await AsyncStorage.getItem("url");
    axios({
      method: "post",
      url: url + "booking_requests/",
      data: {
        event_id: this.props.index,
        status: "pending",
      },
      headers: {
        Accept: "application/json",
        Authorization: this.props.auth_token,
      },
    })
      .then(({ data: response }) => {
        this.setState({
          spinner: false,
          data: response,
          status: response.status,
          isLoading: false,
        });
        this.setState((prevState) => {
          return { count: prevState.count + 1 };
        });
        if (response.error == true) {
          return;
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // console.log(this.props.banner_image)
    // Alert.alert(this.props.requests.toString());

    const { banner_image } = this.props;
    console.log(banner_image);
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.props.is_superhost == true) {
            return this.props.navigation.navigate("HostEventdetail", {
              id: this.props.index,
              routeplace: this.props.navigation.state.routeName,
              event_title: this.props.event_title,
            });
          } else if (this.props.is_userhost == true) {
            return this.props.navigation.navigate("UserHostEventdetail", {
              id: this.props.index,
              routeplace: this.props.navigation.state.routeName,
              event_title: this.props.event_title,
            });
          } else if (this.props.is_superhost == false) {
            return this.props.navigation.navigate("UserEventdetail", {
              id: this.props.index,
              routeplace: this.props.navigation.state.routeName,
              event_title: this.props.event_title,
            });
          }
        }}
        style={{
          height: this.props.screen == "Client" ? 430 : 380,
          borderBottomColor: "#ede9e8",
          borderBottomWidth: 1,
          marginBottom: 20,
        }}
      >
        {this.props.screen == "Client" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              width: "95%",
              height: 80,
            }}
          >
            <Image
              source={require("../images/signup.png")}
              style={{ aspectRatio: 512 / 512, height: 65, width: undefined }}
            />
            {/* <Image source={{uri: this.props.front_image}} style={{aspectRatio: 512/512, height: 65, width: undefined}} /> */}
            <Text style={{ fontSize: 25, fontWeight: "bold", paddingLeft: 8 }}>
              {this.props.event_title}
            </Text>
          </View>
        )}
        <View style={{ height: 200 }}>
          <ImageBackground
            source={{ uri: this.props.banner_image }}
            style={{ width: "100%", height: 200 }}
          >
            {/* <Image source={{uri:this.props.banner_image}} style={{ width: "100%", height: 200 }}/> */}
            {/* {this.props.is_superhost == true && ( */}
            <TouchableOpacity
              style={{
                alignItems: "center",
                position: "absolute",
                paddingHorizontal: 20,
                justifyContent: "center",
                height: 80,
                backgroundColor: THEME_COLOR,
                opacity: 0.5,
              }}
            >
              <Text style={{ color: "white", opacity: 3, fontSize: 20 }}>
                {this.props.event_title}
              </Text>
            </TouchableOpacity>
            {/* )} */}
            {this.props.is_superhost == true && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("EditEvent", {
                    id: this.props.index,
                  });
                }}
                style={{
                  alignItems: "flex-end",
                  paddingHorizontal: 20,
                  justifyContent: "flex-end",
                  height: 30,
                }}
              >
                <Icon name="pencil" type="material" size={22} color={"green"} />
              </TouchableOpacity>
            )}
          </ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: "#ffffff",
          }}
        >
          <View style={{ flex: 0.6, flexDirection: "row" }}>
            <View style={{ flex: 0.85, flexDirection: "row", paddingTop: 20 }}>
              <Rating
                type="custom"
                imageSize={20}
                readonly
                startingValue={this.props.rating}
                // ratingColor='#51d44c'
              />
              <Text style={{ color: THEME_COLOR, marginLeft: 5, marginTop: 3 }}>
                {this.props.rating}
              </Text>
            </View>
            <View
              style={{
                flex: 0.25,
                flexDirection: "row",
                paddingTop: 20,
                justifyContent: "flex-end",
              }}
            >
              {/* <TouchableOpacity
                style={{
                  backgroundColor: "#51d44c",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                  height: 50,
                  width: 50,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
                >
                  ${this.props.price}
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={{ flex: 0.4, flexDirection: "row" }}>
            <View style={{ flex: 0.75, flexDirection: "row" }}>
              <View style={{ flex: 0.4 }}>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                  }}
                >
                  <Icon name="location-arrow" size={16} color={THEME_COLOR} />
                  <Text
                    style={{ color: "black", fontSize: 12, paddingTop: 10 }}
                  >
                    {this.props.location}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.6 }}>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                  }}
                >
                  <Icon name="clock-o" size={16} color={THEME_COLOR} />
                  <Text
                    style={{ color: "black", fontSize: 10, paddingTop: 10 }}
                  >
                    {this.props.date} {this.props.time}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 0.35,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {!this.props.is_superhost &&
                this.props.join &&
                this.props.status == null &&
                this.state.status != "pending" && (
                  <TouchableOpacity
                    onPress={() => {
                      this.JoinPressed();
                    }}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: THEME_COLOR,
                      borderRadius: 100,
                      height: 35,
                      width: 35,
                      marginRight: 5,
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "white", opacity: 3, fontSize: 12 }}>
                      Join
                    </Text>
                  </TouchableOpacity>
                )}
              {this.props.type == "approvalScreen" && (
                <TouchableOpacity
                  style={[
                    (this.props.approval_status == "Approved" &&
                      styles.approved_status_btn) ||
                      (this.props.approval_status == "Pending" &&
                        styles.pending_status_btn) ||
                      (this.props.approval_status == "Denied" &&
                        styles.denied_status_btn),
                  ]}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {this.props.approval_status}
                  </Text>
                </TouchableOpacity>
              )}
              {this.props.type != "approvalScreen" && (
                <TouchableOpacity
                  onPress={() => {
                    if (
                      this.state.count > 0 &&
                      this.props.is_superhost == true
                    ) {
                      this.props.navigation.navigate("EventRequests", {
                        index: this.props.index,
                      });
                    }
                    if (
                      this.state.count == 0 &&
                      this.props.is_superhost == true
                    ) {
                      alert("0 Request");
                    }
                  }}
                  style={{
                    alignItems: "center",
                    marginTop: 10,
                    justifyContent: "center",
                    backgroundColor: THEME_COLOR,
                    height: 35,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {this.state.count}{" "}
                    {/* {this.props.is_superhost == true ? this.state.count : ""}{" "} */}
                    Requests
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <Toast ref="toast" position="bottom" positionValue={50} />
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  approved_status_btn: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "#51d44c",
    height: 35,
    paddingHorizontal: 10,
  },
  denied_status_btn: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "#ff0000",
    height: 35,
    paddingHorizontal: 10,
  },
  pending_status_btn: {
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: THEME_COLOR,
    height: 35,
    paddingHorizontal: 10,
  },
});
const mapStateToProps = (state) => ({
  auth_token: state.auth_token,
  is_superhost: state.is_superhost,
  is_userhost: state.is_userhost,
});
const mapDispatchToProps = (dispatch) => {
  return {
    // setGroup: (data) => {dispatch({type: GROUP, payload:data})},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);
