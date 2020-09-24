import React, { Component } from "react";
import {
  TextInput,
  StatusBar,
  Share,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  AsyncStorage,
  FlatList,
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
import styles from "../../components/style/SearchBar";
import SearchBar from "../../components/SearchBar";
import Toast from "react-native-easy-toast";
import * as FileSystem from "expo-file-system";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      uri: "",
      input: "",
      Data: [],
      data: [],
      // [
      //        {id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ,{id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ,{id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ,{id:'1',event_title:'Event title',dp:'../../images/backgroung.jpg',price:'1000',date:'21-02-2020',rating:'5',request:'9',location:'Lahore'}
      //       ]
    };
  }
  componentDidMount = async () => {
    this.setState({ isLoading: true });
    let url = await AsyncStorage.getItem("url");
    // let is_superhost = await AsyncStorage.getItem('is_superhost');
    // console.log(url);
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
        console.log(response);
        this.setState({ Data: response.events });
        // console.log(this.state.Data)
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
    console.log("Rating is: " + rating);
  }
  onSubmitSearch(text) {
    // var items = [];
    // items = this.state.Data;
    //passing the inserted text in textinput
    const newData = this.state.Data.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      data: newData,
      // text: text,
    });
  }
  render() {
    return (
      <View style={style.container}>
        <View style={styles.fieldContainer}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../../images/search.png")}
            />
          </View>
          <TextInput
            onChangeText={(input) => this.setState({ input: input })}
            onSubmitEditing={() => this.onSubmitSearch(this.state.input)}
            placeholder="Search"
            placeholderTextColor="black"
            returnKeyType="done"
            returnKeyLabel="done"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <FlatList
          data={this.state.input === "" ? this.state.Data : this.state.data}
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
              navigation={this.props.navigation}
              status={item.client_booking_status}
              color="white"
              actionType="OPEN_SINGLE_GROUP"
              join={true}
              screen="search"
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Toast ref="toast" position="top" positionValue={50} />
        <StatusBar barStyle="white" backgroundColor="transparent" />
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
