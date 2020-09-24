import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  AsyncStorage,
  SafeAreaView,
  Alert,
  StatusBar,
} from "react-native";
import axios from "react-native-axios";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
import { THEME_COLOR } from "../components/colors";
import Toast from "react-native-easy-toast";
class Request extends Component {
  // new below

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      Data: "",
      booking_requests: [],
    };
  }
  static navigationOptions = {
    title: "EventRequest",
    headerTitleStyle: {
      fontSize: 22,
      textAlign: "center",
      flex: 1,
    },
  };
  componentDidMount = async () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.eventReq();
    });
  };
  componentDidUpdate() {
    if (this.props.connected === "false")
      this.refs.toast.show(response.message, 2000);
  }
  isRequestApproved = async (txtstatus, req_id) => {
    // this.setState({isLoading: true});
    let url = await AsyncStorage.getItem("url");
    var data = new FormData();
    data.append("status", txtstatus);
    axios({
      method: "put",
      url: url + "booking_requests/" + req_id,
      // url: url + "booking_requests/" + 1,
      data: data,
      headers: {
        Accept: "application/json",
        Authorization: this.props.auth_token,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data: response }) => {
        console.log("before", this.state.booking_requests);
        this.setState({
          Data: "",
          booking_requests: [],
          isLoading: false,
        });

        this.setState({ isLoading: true });
        this.eventReq();
        console.log("after", this.state.booking_requests);
        if (response.error) {
          this.refs.toast.show(response.message, 2000);
          this.setState({ isLoading: false });
          return;
        }
        console.log(response);
        // this.setState({username: response.username, email: response.email, bio: response.bio, dob: response.date, phone: response.phone, isLoading: false});
        // this.props.profileImage(response.image);
        // this.props.setUsername(response.username);
        this.refs.toast.show(response.message, 2000);
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  eventReq = async () => {
    this.setState({ isLoading: true });
    let url = await AsyncStorage.getItem("url");
    // let is_superhost = await AsyncStorage.getItem('is_superhost');
    axios({
      method: "get",
      url:
        url +
        "events/" +
        this.props.navigation.getParam("index") +
        "/get_bookings",
      headers: {
        Accept: "application/json",
        Authorization: this.props.auth_token,
      },
    })
      .then(({ data: response }) => {
        //
        this.setState({
          Data: response,
          booking_requests: response.booking_requests,
          isLoading: false,
        });
        // console.log(this.state.Data);
        console.log("in event request function", this.state.booking_requests);
        if (response.error == true) {
          return;
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // new above
  render() {
    // console.log("this->>>>>" + this.props.navigation.getParam("index"));
    // console.log("id : from request ", this.props);
    return (
      <ScrollView>
        <View style={{ margin: 20 }}>
          {this.state.booking_requests.map((data) => {
            return (
              <View key={data.id} style={styles.borderBottomSize2}>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                  {/* left side */}
                  <View style={[styles.row, styles.p10Center]}>
                    <Image
                      style={styles.IconView}
                      source={{ uri: data.image }}
                    />
                    <View>
                      <Text>{data.name}</Text>
                    </View>
                  </View>
                  {/* right side */}

                  <View style={[styles.row, styles.p10Center]}>
                    <TouchableOpacity
                      style={styles.btnBlue}
                      onPress={() =>
                        this.isRequestApproved("approved", data.id)
                      }
                    >
                      <Text style={styles.whiteText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnRed}
                      onPress={() => this.isRequestApproved("denied", data.id)}
                    >
                      <Text style={styles.whiteText}>Deny</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <Toast ref="toast" position="top" positionValue={50} />
        <StatusBar barStyle="white" backgroundColor={THEME_COLOR} />
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  auth_token: state.auth_token,
  connected: state.Connected,
});
export default connect(mapStateToProps)(Request);

const styles = StyleSheet.create({
  IconView: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#518DFE",
    // backgroundColor: "transparent",
    marginEnd: 10,
    padding: 5,
  },
  row: {
    flexDirection: "row",
  },
  p10Center: {
    padding: 10,
    alignItems: "center",
  },
  whiteText: {
    color: "white",
    fontSize: 10,
  },
  btnRed: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#ED1B24",
  },
  btnBlue: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#518CFF",
  },
  borderBottomSize2: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 2,
  },
});
