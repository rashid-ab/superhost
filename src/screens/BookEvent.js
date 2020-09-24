import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  AsyncStorage,
  StatusBar,
} from "react-native";
import { connect } from "react-redux";
import axios from "react-native-axios";
import Toast from "react-native-easy-toast";
import EventContainer from "../components/EventContainer";
import style from "../styles/BookEvent";
import Icon from "react-native-vector-icons/FontAwesome";
import { THEME_COLOR } from "../components/colors";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: "",
      isLoading: false,
    };
  }
  // static navigationOptions = {
  //     header: null,
  // };
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    let url = await AsyncStorage.getItem("url");
    axios({
      method: "get",
      url: url + "events/client_events",
      headers: {
        Accept: "application/json",
        Authorization: this.props.auth_token,
      },
      timeout: 1000 * 3,
    })
      .then(({ data: response }) => {
        // console.log(response);
        if (response.error == true) {
          this.refs.toast.show(response.message, 2000);
          return;
        }
        this.setState({ Data: response.bookings, isLoading: false });
      })
      .catch((error) => {
        // console.log(JSON.stringify(error));
      });
  };
  componentDidUpdate() {
    if (this.props.connected === "false")
      this.refs.toast.show(response.message, 2000);
  }
  handleAction = (actionType, text = null) => {
    switch (actionType) {
      case "SEARCH":
        console.log(text);
        break;
      default:
        break;
    }
    this.setState({ isLoading: true });
  };

  render() {
    return (
      <View style={style.container}>
        <SearchBar search={this.handleAction} />
        {this.state.Data.length == 0 ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: THEME_COLOR }}>
              No Event Booked!
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
              onRefresh={() => this.componentDidMount()}
            />
          }
          renderItem={({ item, index }) => (
            <EventContainer
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
              join={true}
              location={item.location}
              status={item.status}
              navigation={this.props.navigation}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <StatusBar barStyle="white" backgroundColor={THEME_COLOR} />
        <Toast ref="toast" position="top" positionValue={50} />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  auth_token: state.auth_token,
  connected: state.Connected,
});
export default connect(mapStateToProps, null)(Booking);
