import React, { Component } from "react";
import {
  Share,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  AsyncStorage,
  FlatList,
  StatusBar,
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
class Approvals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      uri: "",
      Data: "",
      // [
      //        {id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ,{id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ,{id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ,{id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ]
    };
    this.onPress = this.onPress.bind(this);
  }
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    let url = await AsyncStorage.getItem("url");
    let is_superhost = await AsyncStorage.getItem("is_superhost");
    // console.log(url);
    axios({
      method: "GET",
      url: url + "events/client_events",
      headers: {
        Accept: "application/json",
        Authorization: this.props.auth_token,
      },
      // data: { is_superhost: is_superhost },
      // timeout: 1000 * 3,
    })
      .then(({ data: response }) => {
        // console.log(response);
        this.setState({ Data: response.bookings });
        if (response.error == true) {
          this.refs.toast.show(response.message, 2000);
          return;
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onPress = async (link, filename) => {
    // alert(link)
    const fileUri = FileSystem.documentDirectory + filename;
    const url = link;
    let downloadObject = FileSystem.createDownloadResumable(url, fileUri);
    let response = await downloadObject.downloadAsync();
    // console.log(response);
    const result = await Share.share({
      url: response.uri,
      title: response.filename,
    });
  };
  componentDidUpdate() {
    if (this.props.connected === "false")
      this.refs.toast.show(response.message, 2000);
  }
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
    // sconsole.log("Rating is: " + rating)
  }

  render() {
    return (
      <View style={style.container}>
        {this.state.Data.length == 0 ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: THEME_COLOR }}>
              No Request Approved!
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
              banner_image={item.banner_image}
              price={item.price}
              date={item.date}
              time={item.time}
              rating={item.rating}
              requests={item.requests}
              location={item.location}
              approval_status={item.status}
              navigation={this.props.navigation}
              join={false}
              color="white"
              actionType="OPEN_SINGLE_GROUP"
              screen="GroupScreen"
              type="approvalScreen"
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Toast ref="toast" position="top" positionValue={50} />
        <StatusBar barStyle="light-content" backgroundColor="white" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth_token: state.auth_token,
  connected: state.Connected,
});

export default connect(mapStateToProps)(Approvals);
