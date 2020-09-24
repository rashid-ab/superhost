import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  StatusBar,
  BackHandler,
  Modal,
} from "react-native";
import { Rating } from "react-native-elements";
import Toast from "react-native-easy-toast";
import axios from "react-native-axios";
import Spinner from "react-native-loading-spinner-overlay";
import spinner_style from "../styles/spinner";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { THEME_COLOR } from "../components/colors";
import { TextInput } from "react-native-gesture-handler";
class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      modalShow: false,
      showReviewbtn: false,
      reviewText: "",
      Data: "",
      rating: "",
      event_dates: [],
      attendee: [],
      attachments: [],
      reviews: [],
      spinner: false,
      time: "",
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("event_title"),
      headerTitleStyle: {
        fontSize: 22,
        textAlign: "center",
        flex: 1,
      },
    };
  };
  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.EventDetail();
    });
  };
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.focusListener.remove();
  }

  // GetTime() {
  //   // Creating variables to hold time.
  //   var date, TimeType, hour, minutes, seconds, fullTime;

  //   // Creating Date() function object.
  //   date = new Date();

  //   // Getting current hour from Date object.
  //   hour = date.getHours();

  //   // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
  //   if (hour <= 11) {
  //     TimeType = "AM";
  //   } else {
  //     // If the Hour is Not less than equals to 11 then Set the Time format as PM.
  //     TimeType = "PM";
  //   }

  //   // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
  //   if (hour > 12) {
  //     hour = hour - 12;
  //   }

  //   // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format.
  //   if (hour == 0) {
  //     hour = 12;
  //   }

  //   // Getting the current minutes from date object.
  //   minutes = date.getMinutes();

  //   // Checking if the minutes value is less then 10 then add 0 before minutes.
  //   if (minutes < 10) {
  //     minutes = "0" + minutes.toString();
  //   }

  //   //Getting current seconds from date object.
  //   seconds = date.getSeconds();

  //   // If seconds value is less than 10 then add 0 before seconds.
  //   if (seconds < 10) {
  //     seconds = "0" + seconds.toString();
  //   }

  //   // Adding all the variables in fullTime variable.
  //   fullTime =
  //     hour.toString() +
  //     ":" +
  //     minutes.toString() +
  //     ":" +
  //     seconds.toString() +
  //     ":" +
  //     TimeType.toString();

  //   // Setting up fullTime variable in State.
  //   this.setState({
  //     time: fullTime,
  //   });
  // }

  handleBackButtonClick() {
    if (this.props.is_superhost == true)
      return this.props.navigation.goBack(this.props.routeplace);
    if (this.props.is_superhost == false) {
      if (this.props.is_userhost == true) {
        return this.props.navigation.navigate("UserHostInbox");
      } else return this.props.navigation.navigate("UserInbox");
    }
  }
  //   if(this.props.is_superhost=='Userhost')
  //   console.log(this.props.routeplace)
  //     return this.props.navigation.goBack(this.props.routeplace);
  // }

  AddReview = async () => {
    let url = await AsyncStorage.getItem("url");
    // console.log(url);
    var data = new FormData();
    data.append("event_id", this.props.navigation.getParam("id"));
    data.append("description", this.state.reviewText);
    data.append("rating", this.state.rating);

    // console.log(data);
    axios({
      method: "post",
      url: url + "/reviews",
      data: {
        event_id: this.props.navigation.getParam("id"),
        description: this.state.reviewText,
        rating: this.state.rating,
      },
      headers: {
        Accept: "application/json",
        Authorization: this.props.auth_token,
      },
    })
      .then(({ data: response }) => {
        console.log(response);
        if (response.error == true) {
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  EventDetail = async () => {
    this.setState({ spinner: true });
    // console.log(this.props.navigation.getParam("id"));
    // console.log(this.props.auth_token);
    // console.log(this.props.is_superhost);
    let url = await AsyncStorage.getItem("url");
    // console.log("", await AsyncStorage.getItem('user_id'));
    let user_id = await AsyncStorage.getItem("user_id");
    axios({
      method: "get",
      url: url + "events/" + this.props.navigation.getParam("id"),
      headers: {
        Accept: "application/json",
        Authorization: this.props.auth_token,
      },
    })
      .then(({ data: response }) => {
        // console.log("=>>>>>>>>>>>>>>>>> event detail", response);
        // this.GetTime();
        // console.log("event 0th date", response.date);
        // console.log("event 0th date", response.end_time);
        // console.log("event 0th date", this.state.time.toString().split(":"));
        // console.log("event 0th date", response.event_dates[0].date.split("-"));
        // console.log(
        //   "event 0th date",
        //   response.event_dates[0].date.split("-")[2]
        // );
        // console.log(
        //   "local date",
        //   new Date().getDate(),
        //   "-",
        //   new Date().getMonth(),
        //   "-",
        //   new Date().getFullYear()
        // );

        var e_d = new Date(response.date);
        var l_d = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          "00",
          "00",
          "00"
        );
        // console.log(response.date);
        // console.log(e_d);
        // console.log("--------------------------------");
        // console.log(l_d);

        // console.log("--------------------------------");
        // console.log(this.props.navigation.getParam("id"));
        // if (new Date().getFullYear() >= response.date.split("-")[2]) {
        //   console.log(
        //     "local year is greater then event year => event passed year wise"
        //   );

        //   if (new Date().getMonth() + 1 >= response.date.split("-")[1]) {
        //     console.log(
        //       "local month is greater then event month => event passed month wise"
        //     );

        //     if (new Date().getDate() >= response.date.split("-")[0]) {
        //       console.log(
        //         "local date is greater then event date => event passed date wise"
        //       );

        //       //date wise event is passedd

        //       this.setState({ showReviewbtn: true });
        //     } else {
        //       this.setState({ showReviewbtn: false });
        //     }
        //   } else {
        //     this.setState({ showReviewbtn: false });
        //   }
        // } else {
        //   this.setState({ showReviewbtn: false });
        // }

        response.attachments.forEach((item, i) => {
          const newFile = {
            uri: item.url,
            type: item.file_type,
            name: item.name,
          };
          this.state.attachments.push(newFile);
        });
        this.setState({
          spinner: false,
          Data: response,
          event_dates: response.event_dates,
          attendee: response.attendees,
          attachments: this.state.attachments,
          reviews: response.reviews,
          isLoading: false,
        });

        if (e_d < l_d) {
          this.state.attendee.map((data) => {
            // console.log(typeof (data.attendee_id), "          ", typeof (parseInt(user_id)))
            if (data.attendee_id == parseFloat(user_id)) {
              this.setState({ showReviewbtn: true });
            } else {
              this.setState({ showReviewbtn: false });
            }
          });
        } else {
          this.setState({ showReviewbtn: false });
        }

        if (response.error == true) {
          return;
        }
        // console.log(this.state.showReviewbtn);
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <View style={styles.test}>
        <SafeAreaView>
          <ScrollView>
            {/* image View */}
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {/* back image */}
              <Image
                style={{ height: 150, width: "100%" }}
                source={{ uri: this.state.Data.banner_image }}
              />
              {/* circle image */}
              <Image
                resizeMode="cover"
                // resizeMode="contain"
                style={styles.circleImage}
                source={{ uri: this.state.Data.front_image }}
              />
            </View>

            {/* Event Title View */}
            <View
              style={{
                marginTop: 50,
              }}
            >
              {/* heading bold */}
              <Text
                style={[
                  styles.headingBold,
                  styles.bottomMargin5,
                  { alignSelf: "center" },
                ]}
              >
                {" "}
                {this.state.Data.title}{" "}
              </Text>
              {/* sub title */}
              <Text style={[styles.subTitle, styles.bottomMargin5]}>
                {" "}
                {this.state.Data.description}
              </Text>
            </View>

            {/* date time location View */}
            <View style={styles.dateTimeLocationView}>
              {/* date View */}
              <View style={styles.row}>
                <Text>{this.state.Data.date}</Text>
              </View>
              {/* time View */}
              <View style={styles.row}>
                <Text>
                  {this.state.Data.start_time}/{this.state.Data.end_time}
                </Text>
              </View>
              {/* Location View */}
              <View style={styles.row}>
                <Text>{this.state.Data.location}</Text>
              </View>
            </View>

            {/* future details View */}
            <View
              style={{
                paddingVertical: 10,
              }}
            >
              {/* Heading */}
              <Text style={styles.headingBold}> Future Details</Text>

              {/* dates View */}
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 10,
                    }}
                  >
                    {this.state.event_dates.map((data, index) => {
                      return (
                        <View key={index} style={styles.column}>
                          <Text>{data.date}</Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>

            {/* persons View*/}
            <View style={styles.GrayBackView}>
              <Text style={styles.heading}> Who is attending</Text>

              <View style={styles.row}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.attendee.map((data, index) => {
                    return (
                      <View key={index} style={[styles.row, styles.p10Center]}>
                        <View style={styles.IconView}>
                          <Image source={{ uri: data.image }} />
                        </View>
                        <View>
                          <Text style={styles.coloredText}>{data.name}</Text>
                          <Text>{data.bio}</Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              {/* <Image
                style={{
                  height: 150,
                  width: 345,
                }}
                resizeMode="contain"
                source={require("../images/apple.png")}
              /> */}
            </View>
            <View
              style={[
                styles.GrayBackView,
                { marginVertical: 5, alignItems: "center" },
              ]}
            >
              <Text style={styles.heading}>Address</Text>
            </View>
            <View style={styles.GrayBackView}>
              <View style={[styles.row, { justifyContent: "space-between" }]}>
                <Text style={styles.heading}> Reviews</Text>
                <View>
                  <Modal
                    animationType="slide"
                    // style={{ backgroundColor: "green" }}
                    visible={this.state.modalShow}
                    // visible={true}
                  >
                    <View style={{ margin: 20 }}>
                      <Text style={styles.headingBold}>Add Reviews</Text>
                      <TextInput
                        style={{
                          // width: "80%",
                          fontSize: 16,
                          // paddingTop: 35,
                          padding: 5,
                          // color: "white",
                          borderBottomColor: "black",
                          borderBottomWidth: 1,
                        }}
                        placeholder="Enter review"
                        onChangeText={(text) => {
                          this.setState({ reviewText: text });
                          // console.log(this.state.reviewText);
                        }}
                      ></TextInput>

                      <View
                        style={{
                          // flex: 0.85,
                          flexDirection: "row",
                          paddingTop: 20,
                        }}
                      >
                        <Rating
                          // type="custom"
                          fractions={1}
                          // showRating
                          imageSize={20}
                          startingValue={0}
                          onFinishRating={(srating) => {
                            this.setState({ rating: srating });
                            // console.log("Rating is: " + srating);
                          }}
                          // ratingColor="#51d44c"
                        />
                      </View>
                    </View>

                    <View
                      style={[
                        styles.row,
                        { justifyContent: "space-between", padding: 20 },
                      ]}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: THEME_COLOR,
                          borderRadius: 5,
                          padding: 5,
                        }}
                        onPress={() => {
                          alert("added");
                          this.setState({ modalShow: false });
                          this.AddReview();
                          this.EventDetail();
                        }}
                      >
                        <Text style={{ color: "white" }}>Add Review</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "red",
                          borderRadius: 5,
                          padding: 5,
                        }}
                        onPress={() => {
                          this.setState({ modalShow: false });
                        }}
                      >
                        <Text style={{ color: "white" }}>close</Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>

                  {this.state.showReviewbtn &&
                    this.state.Data.status == "approved" && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: THEME_COLOR,
                          paddingHorizontal: 20,
                          paddingVertical: 10,
                          borderRadius: 100,
                          color: "white",
                        }}
                        onPress={() => {
                          this.setState({ modalShow: true });
                        }}
                      >
                        <Text style={{ color: "white" }}>+</Text>
                      </TouchableOpacity>
                    )}
                </View>
              </View>
              <View style={styles.row}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.reviews.map((data, index) => {
                    return (
                      <View
                        key={index}
                        style={[styles.row, { alignItems: "center" }]}
                      >
                        <View>
                          <View style={styles.AttendingPerson}>
                            <View style={styles.IconView}>
                              <Icon
                                name="person"
                                type="material"
                                color="white"
                                size={30}
                              />
                            </View>
                          </View>
                        </View>

                        <View>
                          <Text style={styles.coloredText}>{data.name}</Text>
                          <Text>{data.rating}</Text>
                          <Text>{data.description}</Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>

            {/* button */}

            <TouchableOpacity>
              <View style={styles.btnView}>
                <Icon name="done" type="material" color="white" />
                <Text style={styles.btnText}>Further Details</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
        <Toast ref="toast" position="top" positionValue={50} />
        <StatusBar barStyle="white" backgroundColor={THEME_COLOR} />
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={spinner_style.spinnerTextStyle}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  auth_token: state.auth_token,
  is_superhost: state.is_superhost,
  is_userhost: state.is_userhost,
  connected: state.Connected,
});

export default connect(mapStateToProps)(EventDetail);

const styles = StyleSheet.create({
  IconView: {
    borderRadius: 50,
    marginEnd: 10,
    width: 50,
    height: 50,
    // padding: 10
  },
  GrayBackView: {
    margin: 15,
    backgroundColor: "rgba(219, 219, 219, 0.5)",
    padding: 10,
    borderRadius: 3,
  },
  AttendingPerson: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  btnView: {
    margin: 15,
    backgroundColor: "#518DFE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  btnText: {
    color: "white",
    marginLeft: 5,
  },
  coloredText: {
    color: "#518DFE",
  },
  headingBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
  heading: {
    fontSize: 18,
  },
  subTitle: {
    alignSelf: "center",
    fontSize: 12,
  },
  bottomMargin5: {
    marginBottom: 5,
  },
  dateTimeLocationView: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 3,
    borderColor: "#518DFE",
    paddingTop: 10,
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    width: 230,
    // flexDirection: 'column'
  },
  p10Center: {
    padding: 10,
    alignItems: "center",
  },
  circleImage: {
    marginTop: 100,
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});
