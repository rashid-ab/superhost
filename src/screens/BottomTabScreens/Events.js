import React, { Component } from "react";
import {
  Share,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  AsyncStorage,
  FlatList,
  Alert,
} from "react-native";
import style from "../../styles/Event";
import {
  HEADING_FONT_COLOR,
  MESSAGE_FONT_COLOR,
  THEME_COLOR,
} from "../../components/colors";
import EventContainer from "../../components/EventContainer";
import axios from "react-native-axios";
import { connect } from "react-redux";
import Toast from "react-native-easy-toast";
import * as FileSystem from "expo-file-system";
import { createNativeWrapper } from "react-native-gesture-handler";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      uri: "",
      Data: [],
      // [
      //        {id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ,{id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ,{id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ,{id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ]
    };
  }
  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.events_FUN();
    });
  };
  // componentDidMount = () => {
  //   const { navigation } = this.props;
  //   this.focusListener = navigation.addListener("willFocus", () => {
  //     this.events_FUN();
  //   });
  // };
  events_FUN = async () => {
    this.setState({ Data: [] });
    this.setState({ isLoading: true });
    let url = await AsyncStorage.getItem("url");
    // let is_superhost = await AsyncStorage.getItem('is_superhost');
    axios({
      method: "post",
      url: url + "events/home",
      headers: {
        Accept: "application/json",
        Authorization: this.props.auth_token,
      },
      data: { is_superhost: this.props.is_superhost },
      timeout: 1000 * 3,
    })
      .then(({ data: response }) => {
        this.setState({ Data: response.events });
        this.setState({ isLoading: false });
        // console.log("=>>>>>>>>>>>>>> events.js", this.state.Data[0]);

        if (response.error == true) {
          this.refs.toast.show(response.message, 2000);
          return;
        }
        // Alert.alert("i am loaded");
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  buttonAction = (buttonName) => {
    switch (buttonName) {
      case "backSymbol":
        this.props.navigation.goBack(null);
        break;
      case "time":
        alert("time");
        break;
      case "delete":
        alert("delete");
        break;
      case "back":
        alert("back");
        break;
      case "bBack":
        alert("bBack");
        break;
    }
  };
  ratingCompleted(rating) {
    // console.log("Rating is: " + rating)
  }
  render() {
    return (
      <View style={style.container}>
        {/* {console.log(this.props.navigation.getParam("user_id"))} */}

        <StatusBar
          barStyle={this.props.is_superhost ? "white" : THEME_COLOR}
          backgroundColor={this.props.is_superhost ? THEME_COLOR : "white"}
        />
        {this.state.Data.length == 0 ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: THEME_COLOR }}>
              No Event Created!
            </Text>
          </View>
        ) : (
          <></>
        )}
        <FlatList
          data={this.state.Data}
          contentContainerStyle={{}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              // refreshing={true}
              onRefresh={() => {
                this.events_FUN();
              }}
            />
          }
          renderItem={({ item, index }) => (
            <EventContainer
              itemsindex={index}
              index={item.id}
              event_title={item.title}
              data={item}
              // front_image={item.front_image}
              banner_image={item.banner_image}
              price={item.price}
              date={item.date}
              time={item.time}
              rating={item.rating}
              requests={item.requests}
              location={item.location}
              status={item.client_booking_status}
              navigation={this.props.navigation}
              join={true}
              color="white"
              actionType="OPEN_SINGLE_GROUP"
              type="EventScreen"
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Toast ref="toast" position="top" positionValue={50} />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  auth_token: state.auth_token,
  is_superhost: state.is_superhost,
  connected: state.Connected,
});
export default connect(mapStateToProps)(Events);
