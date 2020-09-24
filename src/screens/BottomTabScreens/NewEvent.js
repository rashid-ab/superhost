import React, { Component } from "react";
import {
  Alert,
  View,
  Button,
  Text,
  StyleSheet,
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
  ScrollView,
} from "react-native";
import axios from "react-native-axios";
import { connect } from "react-redux";
import Toast from "react-native-easy-toast";
import style from "../../styles/NewEvent";
import spinner_style from "../../styles/spinner";
import { THEME_COLOR } from "../../components/colors";
import { Icon, CheckBox } from "react-native-elements";
import DropDownItem from "react-native-drop-down-item";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import TimePicker from "react-native-24h-timepicker";
import Spinner from "react-native-loading-spinner-overlay";
const IC_ARR_DOWN = require("../../images/chevrondownoutline_110911.png");
const IC_ARR_UP = require("../../images/chevron-up-512.png");
var radio_props = [
  { label: "Drinking", value: "Drinking" },
  { label: "Outdoor", value: "Outdoor" },
  { label: "Fun", value: "Fun" },
  { label: "Travel", value: "Travel" },
  { label: "Dining", value: "Dining" },
  { label: "Sports", value: "Sports" },
  { label: "Others", value: "Others" },
  //   { label: "Others1", value: "Others1" },
  //   { label: "Others2", value: "Others2" },
  //   { label: "Others3", value: "Others3" },
  //   { label: "Others4", value: "Others4" },
  //   { label: "Others5", value: "Others5" },
  //   { label: "Others6", value: "Others6" },
];
var event_category = [
  { label: "Everyone Invited", value: "Everyone Invited" },
  { label: "Reservation Required", value: "Reservation Required" },
];
class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      title: "",
      description: "",
      price_checked: true,
      radioValue: "",
      isModalVisible: false,
      value: "",
      event_type: "",
      date: "",
      update_date_index: "",
      event_date: [],
      price: 0,
      location: 0,
      event_category: "Everyone Invited",
      age_range: "",
      attachment: [],
      pickermode: "",
      isDatePickerVisible: false,
      start_time: "",
      end_time: "",
      time_decider: "",
      dateCategory: "",
      spinner: false,
      contents: [
        {
          title: "Event Category",
          body: "Hi. I love this component. What do you think?",
        },
      ],
    };
  }
  static navigationOptions = {
    title: "Create Event",
    headerTitleStyle: {
      fontSize: 22,
      textAlign: "center",
      flex: 1,
    },
  };
  componentDidUpdate() {
    if (this.props.connected === "false")
      this.refs.toast.show(response.message, 2000);
  }
  handleAction = async (actionType, text = null, index = null) => {
    // return this.props.navigation.navigate('Events')
    switch (actionType) {
      case "EMAIL_INPUT":
        this.setState({ email: text });
        break;
      case "PASSWORD_INPUT":
        this.setState({ pass: text });
        break;
      case "FIRSTDATE":
        Keyboard.dismiss();
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        if (date < 10) {
          date = "0" + date;
        }
        if (month < 10) {
          month = "0" + month;
        }
        var current_date = year + "-" + month + "-" + date;
        if (text.toISOString().split("T")[0] < current_date) {
          return alert("The date selected has passed");
        }
        this.setState({
          date: text.toISOString().split("T")[0],
          isDatePickerVisible: false,
        });
        break;
      case "NEXT_DATES":
        Keyboard.dismiss();
        if (this.state.date === "") {
          return alert("First Date is Empty");
        }

        var date = text.toISOString().split("T")[0];
        if (date <= this.state.date) {
          return alert("The date selected has passed");
        }
        if (
          this.state.update_date_index === null ||
          this.state.update_date_index === "null" ||
          this.state.update_date_index === ""
        ) {
          for (let j = 0; j < this.state.event_date.length; j++) {
            if (this.state.event_date[j] >= date) {
              return alert("Please select newer date");
            }
          }
        } else {
          for (let j = 0; j < this.state.event_date.length; j++) {
            if (j != this.state.update_date_index) {
              if (this.state.event_date[j] == date) {
                return alert("Date Already Selected");
              }
            }
          }
        }

        if (
          this.state.update_date_index === null ||
          this.state.update_date_index === "null"
        ) {
          this.state.event_date.push(date);
        } else {
          this.state.event_date[this.state.update_date_index] = date;
          this.setState({ update_date_index: "", isDatePickerVisible: false });
        }
        console.log(this.state.event_date);
        this.setState({
          event_date: this.state.event_date,
          isDatePickerVisible: false,
        });
        break;
      case "DELETE_DATE":
        Alert.alert(
          "Do You Want Delete Date?",
          "",
          [
            {
              text: "Yes",
              onPress: () => {
                if (this.state.event_date.length > 1) {
                  this.setState({
                    event_date: this.state.event_date.splice(index, 1),
                  });
                } else {
                  this.setState({
                    event_date: this.state.event_date.splice(index, 0),
                  });
                }
              },
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
        break;
      case "DELETE_IMAGE":
        console.log(this.state.attachment.length);
        Alert.alert(
          "Do You Want Delete Image?",
          "",
          [
            {
              text: "Yes",
              onPress: () => {
                if (this.state.attachment.length > 1) {
                  this.setState({
                    attachment: this.state.attachment.splice(index, 1),
                  });
                } else {
                  this.setState({
                    attachment: this.state.attachment.splice(index, 0),
                  });
                }
              },
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
        break;
      case "SHOW_DATE_PICKER_FIRSTDATE":
        this.setState({
          isDatePickerVisible: true,
          pickermode: "date",
          dateCategory: "FIRSTDATE",
        });
        break;
      case "SHOW_DATE_PICKER_DATE_ARRAY":
        this.setState({
          isDatePickerVisible: true,
          pickermode: "date",
          dateCategory: "NEXT_DATES",
          update_date_index: index,
        });
        break;
      case "CREATE_EVENT":
        var url = await AsyncStorage.getItem("url");
        if (this.state.title == "") {
          return alert("Title Should not Empty");
        }
        if (this.state.description == "") {
          return alert("Descripton Should not Empty");
        }
        if (this.state.event_type == "") {
          return alert("Event Type Should not Empty");
        }
        if (this.state.date == "") {
          return alert("Date Should not Empty");
        }
        if (this.state.attachment.length < 2) {
          return alert("Add Atleast 2 Images!");
        }
        if (this.state.date == "") {
          return alert("Date Should not Empty");
        }
        if (this.state.start_time == "") {
          return alert("Start Time Should not Empty");
        }
        if (this.state.end_time == "") {
          return alert("End Time Should not Empty");
        }
        if (this.state.location == "") {
          return alert("Location Should not Empty");
        }
        if (this.state.age_range == "") {
          return alert("Age range Should not Empty");
        }
        var data = new FormData();
        this.setState({ spinner: true });
        data.append("title", this.state.title);
        data.append("description", this.state.description);
        data.append("date", this.state.date);
        data.append("event_type", this.state.event_type);
        data.append("category", this.state.event_category);
        data.append("location", this.state.location);
        data.append("start_time", this.state.start_time);
        data.append("end_time", this.state.end_time);
        this.state.event_date.forEach((item, i) => {
          data.append("event_date[]", item);
        });
        this.state.attachment.forEach((item, i) => {
          const newFile = {
            uri: item.uri,
            type: "image/png",
            name: item.name,
          };
          if (i == 0) {
            data.append("front_image", {
              uri: item.uri,
              type: "image/png",
              name: item.name,
            });
          }
          if (i == 1) {
            data.append("banner_image", {
              uri: item.uri,
              type: "image/png",
              name: item.name,
            });
          }
          data.append("attachment[]", newFile);
        });
        data.append("price", this.state.price);
        data.append("age_range", this.state.age_range);
        data.append("status", "pending");
        this.setState({ is_Loading: true });
        // console.log(data);
        axios({
          method: "post",
          url: url + "events",
          data: data,
          headers: {
            Accept: "application/json",
            Authorization: this.props.auth_token,
            "Content-Type": "multipart/form-data",
          },
        })
          .then(({ data: response }) => {
            this.setState({
              isLoading: false,
              title: "",
              description: "",
              price_checked: true,
              radioValue: "",
              isModalVisible: false,
              value: "",
              event_type: "",
              date: "",
              update_date_index: "",
              event_date: [],
              price: 0,
              location: 0,
              event_category: "Everyone Invited",
              age_range: "",
              attachment: [],
              pickermode: "",
              isDatePickerVisible: false,
              start_time: "",
              end_time: "",
              time_decider: "",
              dateCategory: "",
              spinner: false,
              contents: [
                {
                  title: "Event Category",
                  body: "Hi. I love this component. What do you think?",
                },
              ],
            });
            // console.log("here", response);
            this.refs.toast.show(response.message, 2000);
          })
          .catch(function (response) {
            //handle error
            console.log(response);
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
      case "Modal":
        Keyboard.dismiss();
        this.setState({ isModalVisible: true });
    }
  };
  componentWillMount = () => {
    if (this.props.navigation.state.params) {
    }
  };
  onCheck = () => {
    if (this.state.price_checked == true) {
      this.setState({ price_checked: false });
    } else {
      this.setState({ price_checked: true, price: "" });
    }
  };
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible, value: "" });
  };
  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    var zone = "";

    if (this.state.time_decider === "END_TIME") {
      var start_time_hour = "";
      var start_time_minute = "";
      start_time_hour = parseInt(
        this.state.start_time.toString().split(":")[0]
      );
      start_time_minute = parseInt(
        this.state.start_time.toString().split(":")[1]
      );
      start_time_minute = parseInt(start_time_minute.toString().split(" ")[0]);
      // if (start_time_hour > hour) {
      //   return alert("End Time should be greater than Start Time");
      // }
      // if (start_time_hour == hour && start_time_minute >= minute) {
      //   return alert("End Time should be greater than Start Time");
      // }
      if (hour > 11) {
        zone = "PM";
      } else {
        zone = "AM";
      }
      this.setState({ end_time: `${hour}:${minute}` });
      this.TimePicker.close();
    }
    if (this.state.time_decider === "START_TIME") {
      if (this.state.end_time !== "") {
        var end_time_hour = "";
        var end_time_minute = "";
        end_time_hour = parseInt(this.state.end_time.toString().split(":")[0]);
        end_time_minute = parseInt(
          this.state.end_time.toString().split(":")[1]
        );
        end_time_minute = parseInt(end_time_minute.toString().split(" ")[0]);
        // if (hour > end_time_hour) {
        //   return alert("Start Time should be Less than End Time");
        // }
        // if (end_time_hour == hour && end_time_minute <= minute) {
        //   return alert("Start Time should be Less than End Time");
        // }
      }
      if (hour > 11) {
        zone = "PM";
      } else {
        zone = "AM";
      }
      this.setState({ start_time: `${hour}:${minute}` });
      this.TimePicker.close();
    }
  }
  TimePickers(text) {
    Keyboard.dismiss();
    if (text === "START_TIME") {
      this.setState({ time_decider: "START_TIME" });
      this.TimePicker.open();
    }
    if (text === "END_TIME") {
      if (this.state.start_time === "") {
        return alert("Set Start Time First!");
      }
      this.setState({ time_decider: "END_TIME" });
      this.TimePicker.open();
    }
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  addPhoto = async (text, index) => {
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
        if (text === "ADD_IMAGE") {
          const dat = this.state.attachment;
          dat.push({
            uri: result.uri,
            file_type: "image",
            name: file[1] + "." + file[2],
          });
          this.setState({ attachment: dat });
        }
        if (text === "UPDATE_IMAGE") {
          const dat = this.state.attachment;
          dat[index] = {
            uri: result.uri,
            file_type: "image",
            name: file[1] + "." + file[2],
          };
          this.setState({ attachment: dat });
        }
        // console.log(this.state.attachment)
      }
    }
  };
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "100%", width: "95%", flex: 1, paddingLeft: 20 }}
      >
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <SafeAreaView style={style.fieldsContainer}>
            <View style={{}}>
              <Modal isVisible={this.state.isModalVisible} style={{}}>
                {/* <Modal isVisible={true} style={{}}> */}
                <View style={{ flex: 0.51, backgroundColor: "white" }}>
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
                          this.setState({
                            isModalVisible: false,
                            isDatePickerVisible: false,
                          });
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
                          <RadioButton labelHorizontal={true} key={i}>
                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              labelHorizontal={true}
                              labelStyle={{
                                fontSize: 16,
                                color: "black",
                                width: "80%",
                                marginTop: 10,
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
                                  event_type: obj.value,
                                  isModalVisible: false,
                                });
                              }}
                              borderWidth={1}
                              buttonInnerColor={THEME_COLOR}
                              buttonOuterColor={
                                this.state.value === i ? "#2196f3" : "#000"
                              }
                              buttonSize={20}
                              buttonOuterSize={20}
                              buttonStyle={{ marginTop: 10 }}
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
            <View style={{ flexDirection: "row" }}>
              <View style={style.InputFile_container}>
                <Icon
                  name="sofa"
                  type="material-community"
                  size={18}
                  color={THEME_COLOR}
                />
              </View>
              <TextInput
                ref="event_title"
                value={this.state.title}
                name="event_title"
                onChangeText={(text) => this.setState({ title: text })}
                returnKeyType="next"
                returnKeyLabel="next"
                autoCapitalize="none"
                placeholder="Event Title"
                placeholderTextColor={"black"}
                onSubmitEditing={() => {
                  this.refs.event_desc.focus();
                }}
                style={style.field}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={style.InputFile_container}>
                <Icon
                  name="sofa"
                  type="material-community"
                  size={18}
                  color={THEME_COLOR}
                />
              </View>
              <TextInput
                ref="event_desc"
                value={this.state.description}
                name="event_desc"
                onChangeText={(text) => this.setState({ description: text })}
                returnKeyType="next"
                returnKeyLabel="next"
                autoCapitalize="none"
                placeholder="Event Description"
                placeholderTextColor={"black"}
                onSubmitEditing={() => {
                  this.refs.event_type.focus();
                }}
                style={style.field}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={style.InputFile_container}>
                <Icon
                  name="sofa"
                  type="material-community"
                  size={18}
                  color={THEME_COLOR}
                />
              </View>
              <TextInput
                ref="event_type"
                onFocus={() => {
                  this.onPress("Modal");
                }}
                name="event_type"
                onChangeText={(text) => this.handleAction("EVENT_TYPE", text)}
                value={this.state.event_type}
                autoCapitalize="none"
                placeholder="Event Type"
                placeholderTextColor={"black"}
                style={style.field}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={style.InputFile_container}>
                <Icon
                  name="clock-o"
                  type="font-awesome"
                  size={18}
                  color={THEME_COLOR}
                />
              </View>
              <TextInput
                ref="event_date"
                value={this.state.date}
                name="event_date"
                returnKeyType="next"
                returnKeyLabel="next"
                autoCapitalize="none"
                onFocus={() =>
                  this.handleAction("SHOW_DATE_PICKER_FIRSTDATE", null)
                }
                placeholder="Event Date"
                placeholderTextColor={"black"}
                onSubmitEditing={() => {
                  this.refs.start_time.focus();
                }}
                style={style.field}
              />
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode={this.state.pickermode}
                onConfirm={(date) =>
                  this.handleAction(this.state.dateCategory, date, null)
                }
                onCancel={() => this.setState({ isDatePickerVisible: false })}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={{ flexDirection: "row", flex: 0.35 }}>
                <View style={style.InputFile_container}>
                  <Icon
                    name="clock-o"
                    type="font-awesome"
                    size={18}
                    color={THEME_COLOR}
                  />
                </View>
                <TextInput
                  ref="start_time"
                  name="start_time"
                  onFocus={() => this.TimePickers("START_TIME")}
                  returnKeyType="next"
                  value={this.state.start_time}
                  returnKeyLabel="next"
                  autoCapitalize="none"
                  placeholder="Start Time"
                  placeholderTextColor={"black"}
                  onSubmitEditing={() => {
                    this.refs.end_time.focus();
                  }}
                  style={style.field}
                />
                <TimePicker
                  ref={(ref) => {
                    this.TimePicker = ref;
                  }}
                  onCancel={() => this.onCancel()}
                  onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                />
              </View>
              <View style={{ flexDirection: "row", flex: 0.4 }}>
                <View style={style.InputFile_container}>
                  <Icon
                    name="clock-o"
                    type="font-awesome"
                    size={18}
                    color={THEME_COLOR}
                  />
                </View>
                <TextInput
                  ref="end_time"
                  name="end_time"
                  onFocus={() => this.TimePickers("END_TIME")}
                  returnKeyType="next"
                  value={this.state.end_time}
                  returnKeyLabel="next"
                  autoCapitalize="none"
                  placeholder="End Time"
                  placeholderTextColor={"black"}
                  onSubmitEditing={() => {}}
                  style={style.field}
                />
              </View>
            </View>
            <View style={{ marginTop: 20, justifyContent: "flex-start" }}>
              <Text style={{ fontSize: 16 }}>Event Photos</Text>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: "row", marginRight: 20 }}
              >
                {this.state.attachment.length === 0 ? (
                  <TouchableOpacity style={style.ImageBoxes}>
                    <Icon
                      name="image"
                      type="font-awesome"
                      size={35}
                      color={THEME_COLOR}
                    />
                  </TouchableOpacity>
                ) : (
                  this.state.attachment.map((data, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.addPhoto("UPDATE_IMAGE", index)}
                        onLongPress={() =>
                          this.handleAction("DELETE_IMAGE", null, index)
                        }
                        style={{
                          backgroundColor: "#f7f7f7",
                          width: 100,
                          height: 100,
                          marginLeft: this.state.attachment.length > 1 ? 10 : 0,
                        }}
                      >
                        <Image
                          source={{ uri: data.uri }}
                          style={{ width: 100, height: 100 }}
                        />
                      </TouchableOpacity>
                    );
                  })
                )}

                {this.state.attachment.length <= 1 ? (
                  <TouchableOpacity
                    style={[style.ImageBoxes, { marginLeft: 20 }]}
                  >
                    <Icon
                      name="image"
                      type="font-awesome"
                      size={35}
                      color={THEME_COLOR}
                    />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </ScrollView>
              <TouchableOpacity
                style={style.ImageBoxes}
                onPress={() => this.addPhoto("ADD_IMAGE")}
              >
                <Icon
                  name="plus"
                  type="font-awesome"
                  size={35}
                  color={THEME_COLOR}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginVertical: 10,
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              {this.state.contents.map((param, i) => {
                return (
                  <DropDownItem
                    key={i}
                    style={styles.dropDownItem}
                    contentVisible={false}
                    invisibleImage={IC_ARR_DOWN}
                    visibleImage={IC_ARR_UP}
                    header={
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "black",
                            width: "100%",
                          }}
                        >
                          {param.title}
                        </Text>
                      </View>
                    }
                  >
                    <View style={{ marginTop: 20 }}>
                      <RadioForm
                        radio_props={event_category}
                        initial={0}
                        formHorizontal={false}
                        buttonColor={"#f0eded"}
                        buttonInnerColor={"#e74c3c"}
                        buttonSize={20}
                        buttonOuterSize={20}
                        animation={true}
                        labelStyle={{ fontSize: 16 }}
                        onPress={(value) => {
                          this.setState({ event_category: value });
                        }}
                      />
                    </View>
                  </DropDownItem>
                );
              })}
            </View>
            {/* <View style={{marginTop:20,justifyContent:'flex-start',width:'100%'}}>
                                <Text style={{fontSize:16}}>Price</Text>
                                <View style={{flexDirection:'row',flex:1}}>
                                    <View style={{flex:.5,fontSize:14,marginLeft:10}}>
                                        <TextInput keyboardType={'numeric'} value={this.state.price} onChangeText={(text)=> {this.setState({price:text,price_checked:text===''?true:false})}} returnKeyType="next" returnKeyLabel="next" autoCapitalize='none' placeholder="Enter Price" placeholderTextColor = {'black'} onSubmitEditing={() => { }} style={style.priceInput} />
                                        </View>
                                    <View style={{marginTop:5,flex:.5}}>
                                        <CheckBox
                                            containerStyle={{backgroundColor:'white',borderWidth:0}}
                                            title='Free'
                                            checked={this.state.price_checked}
                                            onPress={() =>{this.onCheck()}}
                                        />
                                    </View>
                                </View>
                            </View> */}
            <View style={{ marginTop: 2, flexDirection: "row", flex: 1 }}>
              {this.state.event_date.length === 0 ? (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: "row", flex: 0.7 }}
                >
                  <TouchableOpacity
                    style={[
                      style.iconBoxes,
                      {
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 5,
                      },
                    ]}
                  >
                    <Text style={{ color: THEME_COLOR, fontSize: 12 }}>
                      Jan.
                    </Text>
                    <Text style={{ color: "black", fontSize: 8 }}>
                      01-01-2020
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      style.iconBoxes,
                      {
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 5,
                      },
                    ]}
                  >
                    <Text style={{ color: THEME_COLOR, fontSize: 12 }}>
                      Jan.
                    </Text>
                    <Text style={{ color: "black", fontSize: 8 }}>
                      01-01-2020
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection: "row", flex: 0.7 }}
                >
                  {this.state.event_date.map((data, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          this.handleAction(
                            "SHOW_DATE_PICKER_DATE_ARRAY",
                            null,
                            index
                          )
                        }
                        onLongPress={() =>
                          this.handleAction("DELETE_DATE", null, index)
                        }
                        activeOpacity={2}
                        style={[
                          style.iconBoxes,
                          {
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 5,
                          },
                        ]}
                      >
                        <Text style={{ color: "black", fontSize: 10 }}>
                          {data}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
              {/* <View style={[style.iconBoxes,{alignItems:'center',justifyContent:'center',marginLeft:5,flex:.3}]}> */}
              <TouchableOpacity
                style={[
                  style.iconBoxes,
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 5,
                    flex: 0.3,
                  },
                ]}
                onPress={() =>
                  this.handleAction("SHOW_DATE_PICKER_DATE_ARRAY", null, null)
                }
              >
                <Icon
                  name="plus"
                  type="font-awesome"
                  size={20}
                  color={THEME_COLOR}
                />
              </TouchableOpacity>
              {/* </View> */}
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={style.InputFile_container}>
                <Icon
                  name="clock-o"
                  type="font-awesome"
                  size={18}
                  color={THEME_COLOR}
                />
              </View>
              <TextInput
                ref="location"
                value={this.state.location}
                name="location"
                onChangeText={(text) => this.setState({ location: text })}
                returnKeyType="next"
                returnKeyLabel="next"
                autoCapitalize="none"
                placeholder="Event Location"
                placeholderTextColor={"black"}
                onSubmitEditing={() => {
                  this.refs.age_range.focus();
                }}
                style={style.field}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={style.InputFile_container}>
                <Icon
                  name="calendar"
                  type="evilicon"
                  size={18}
                  color={THEME_COLOR}
                />
              </View>
              <TextInput
                ref="age_range"
                value={this.state.age_range}
                keyboardType={"numeric"}
                name="age_range"
                maxLength={2}
                onChangeText={(text) => this.setState({ age_range: text })}
                returnKeyType="next"
                returnKeyLabel="next"
                autoCapitalize="none"
                placeholder="Age Range"
                placeholderTextColor={"black"}
                onSubmitEditing={() => {}}
                style={style.field}
              />
            </View>
            {/* <View style={{marginTop:10,backgroundColor:'#f7f7f7',width:"100%",paddingLeft:5,paddingTop:5}}>
                                <Text style={{fontSize:16,fontWeight:'400'}}>Add Super Host</Text>
                                <View style={{flexDirection:'row'}}>
                                    <View style={[style.dateBox,{alignItems:'center',flexDirection:'row'}]}>
                                        <Image style={{ height: 50, width: 55, }} source={require('../../images/signup.png')} />
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{color:THEME_COLOR,fontSize:14}}>Name</Text>
                                            <Text style={{color:'black',fontSize:12}}>Bio</Text>
                                        </View>
                                    </View>
                                    <View style={[style.dateBox,{alignItems:'center',flexDirection:'row'}]}>
                                        <Image style={{ height: 50, width: 55, }} source={require('../../images/signup.png')} />
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{color:THEME_COLOR,fontSize:14}}>Name</Text>
                                            <Text style={{color:'black',fontSize:12}}>Bio</Text>
                                        </View>
                                    </View>
                                    <View style={[style.dateBox,{alignItems:'center',justifyContent:'center'}]}>
                                        <TouchableOpacity style={style.iconBoxes}>
                                        <Icon name="plus" type="font-awesome" size={35} color={THEME_COLOR}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View> */}
          </SafeAreaView>
        </TouchableWithoutFeedback>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => this.handleAction("CREATE_EVENT")}
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              width: "90%",
              backgroundColor: THEME_COLOR,
            }}
          >
            <Icon name="check" type="font-awesome" size={20} color="white" />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                paddingBottom: Platform.OS === "android" ? 12 : 20,
                paddingTop: Platform.OS === "android" ? 8 : 12,
                marginTop: 5,
              }}
            >
              {" "}
              Create Event
            </Text>
          </TouchableOpacity>
        </View>
        <Toast ref="toast" position="bottom" positionValue={50} />
        <StatusBar barStyle="white" backgroundColor={THEME_COLOR} />
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={spinner_style.spinnerTextStyle}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth_token: state.auth_token,
  connected: state.Connected,
});
export default connect(mapStateToProps, null)(NewEvent);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 60,
  },
  header: {
    width: "100%",
    paddingVertical: 8,
    //   paddingHorizontal: 12,
    //   flexWrap: 'wrap',
    flexDirection: "row",
    alignItems: "center",
  },
  headerTxt: {
    fontSize: 20,
    color: "rgb(74,74,74)",
    //   marginRight: 60,
    //   flexWrap: 'wrap',
  },
  txt: {
    fontSize: 20,
  },
  dropDownItem: {
    width: "100%",
  },
});
