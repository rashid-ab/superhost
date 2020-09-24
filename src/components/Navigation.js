import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  Image,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import Signin from "../screens/Signin";
import { connect } from "react-redux";
import Signup from "../screens/Signup";
import Forget from "../screens/Forget";
import Events from "../screens/BottomTabScreens/Events";
import NewEvent from "../screens/BottomTabScreens/NewEvent";
import Search from "../screens/BottomTabScreens/Search";
import Approvals from "../screens/BottomTabScreens/Approvals";
import BackImage from "./HeaderButtons/backImage";
import CreateEvent from "./HeaderButtons/CreateEvent";
import Profile from "../screens/Profile";
import Booking from "../screens/Booking";
import Book from "../screens/Book";
import BookEvent from "../screens/BookEvent";
import EventRequest from "../screens/EventRequest";
import EditEvent from "../screens/EditEvent";
import EventDetail from "../screens/EventDetail";
import Map from "../screens/Map";
import DrawerContentComponent from "../components/DrawerComponent";
import Modals from "../components/Modal";
// import Modal from "react-native-modal";
import {
  HEADER_COLOR,
  BOTTOM_TAB_COLOR,
  THEME_COLOR,
} from "../components/colors";
import { Icon } from "react-native-elements";
export const Logout = (props) => {
  return props.navigation.navigate("signin", { logout: "logout" });
};
const mapStateToProps = (state) => ({
  is_superhost: state.is_superhost,
});
const isSuperhost = connect(
  mapStateToProps,
  null
)((props) => {
  const supers = props.is_superhost ? userBottomTab : userBottomTabs;
  return props.is_superhost;
});
const createStack = (screen, title = null) => {
  let myTitle = "";
  return createStackNavigator(screen, {
    defaultNavigationOptions: ({ navigation }) => (
      (myTitle = title ? title : setHeaderTitle(navigation)),
      {
        headerStyle: {
          height: Platform.OS === "ios" ? 68 : 78,
          // paddingBottom: 12,
          backgroundColor: THEME_COLOR,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          flexGrow: 1,
          textAlign: "center",
          fontSize: 25,
          marginTop: Platform.OS === "ios" ? 15 : 20,
        },
        headerTitle: myTitle,
        headerTintColor: "#fff",
        headerRight:
          myTitle == "Super Host Home" ? (
            <CreateEvent navigation={navigation} />
          ) : null,
      }
    ),
  });
};
const createStacks = (screen, title = null) => {
  let myTitle = "";
  return createStackNavigator(screen, {
    defaultNavigationOptions: ({ navigation }) =>
      // myTitle = title ? title : setHeaderTitle(navigation),
      ({
        headerStyle: {
          height: Platform.OS === "ios" ? 68 : 78,
          // paddingBottom: 12,
          backgroundColor: THEME_COLOR,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          flexGrow: 1,
          textAlign: "center",
          fontSize: 25,
        },
        // headerTitle: myTitle,
        headerTintColor: "#ffffff",
        headerLeft: <BackImage navigation={navigation} />,
        // headerRight: <CreateEvent navigation={navigation} />,
      }),
  });
};
const myTopTab = createMaterialTopTabNavigator(
  {
    Event: Events,
    // Location: Map,
    Search: Search,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // header: null,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Event") {
          iconName = "sofa";
          type = "material-community";
        } else if (routeName === "Location") {
          iconName = "location-arrow";
          type = "font-awesome";
        } else if (routeName === "Search") {
          iconName = "search";
          type = "font-awesome";
        }
        return <Icon name={iconName} type={type} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: "white",
      inactiveTintColor: THEME_COLOR,
      activeBackgroundColor: THEME_COLOR,
      labelStyle: {
        fontSize: 11,
        height: 60,
      },
      indicatorStyle: {
        height: 60,
        backgroundColor: THEME_COLOR,
      },
      style: {
        backgroundColor: "white",
        height: 60,
      },
    },
  }
);

export const userBottomTab = createBottomTabNavigator(
  {
    Home: myTopTab,
    Booking: createStack({ BookEvent: BookEvent }, "Booking"),
    Approvals: createStack({ Approvals: Approvals }, "Event Approval Request"),
    Host: Modals,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
          type = "font-awesome";
        } else if (routeName === "Booking") {
          iconName = "book";
          type = "font-awesome";
        } else if (routeName === "Approvals") {
          iconName = "user-check";
          type = "feather";
        } else if (routeName === "Host") {
          iconName = "more-horizontal";
          type = "feather";
        }
        return <Icon name={iconName} type={type} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: "white",
      inactiveTintColor: THEME_COLOR,
      activeBackgroundColor: THEME_COLOR,
      labelStyle: {
        fontSize: 14,
      },
      style: {
        backgroundColor: "white",
        height: 60,
      },
    },
  }
);

export const userBottomTabs = createBottomTabNavigator(
  {
    Home: myTopTab,
    Booking: createStack({ screen: BookEvent }, "Booking"),
    Approvals: createStack({ Approvals: Approvals }, "Event Approval Request"),
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home";
          type = "font-awesome";
        } else if (routeName === "Booking") {
          iconName = "book";
          type = "font-awesome";
        } else if (routeName === "Approvals") {
          iconName = "user-check";
          type = "feather";
        } else if (routeName === "Host") {
          iconName = "more-horizontal";
          type = "feather";
        }
        return <Icon name={iconName} type={type} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: "white",
      inactiveTintColor: THEME_COLOR,
      activeBackgroundColor: THEME_COLOR,
      labelStyle: {
        fontSize: 14,
      },
      style: {
        backgroundColor: "white",
        height: 60,
      },
    },
  }
);

export const myBottomTab = createBottomTabNavigator(
  {
    Events: createStack({ Events: Events }, "Super Host Home"),
    Search: createStack({ Search: Search }, "Search"),
    User: Modals,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: null,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Events") {
          iconName = "sofa";
          type = "material-community";
        } else if (routeName === "Search") {
          iconName = "search";
          type = "font-awesome";
        } else if (routeName === "Approvals") {
          iconName = "user-check";
          type = "feather";
        } else if (routeName === "User") {
          iconName = "user";
          type = "font-awesome";
        }
        return <Icon name={iconName} type={type} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: THEME_COLOR,
      activeBackgroundColor: THEME_COLOR,
      labelStyle: {
        fontSize: 14,
      },
      style: {
        backgroundColor: "white",
        height: 60,
      },
    },
  }
);

const UserDrawer = createDrawerNavigator(
  {
    UserInbox: userBottomTabs,
    profile: { screen: (props) => <Profile initialRoute={"UserInbox"} /> },
    booking: Booking,
    // book: Book,
    // map: Map,
    Logout: Logout,
    UserEventdetaila: {
      screen: createStacks({ UserEventdetail: EventDetail }, ""),
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    bookEvents: {
      screen: userBottomTabs,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    bookEvent: {
      screen: userBottomTab,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
  },
  {
    initialRouteName: "UserInbox",
    contentComponent: ({ navigation }) => (
      <DrawerContentComponent
        initialRoute="UserInbox"
        navigation={navigation}
      />
    ),
    drawerPosition: "left",
    drawerWidth: Dimensions.get("window").width - 100,
  }
);
const UserHostDrawer = createDrawerNavigator(
  {
    UserHostInbox: userBottomTab,
    profile: { screen: (props) => <Profile initialRoute={"UserHostInbox"} /> },
    booking: Booking,
    // book: Book,
    // map: Map,
    Logout: Logout,
    HostDraw: {
      screen: myBottomTab,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    UserEventdetaila: {
      screen: createStacks({ UserHostEventdetail: EventDetail }, ""),
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    bookEvents: {
      screen: userBottomTabs,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    bookEvent: {
      screen: userBottomTab,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
  },
  {
    initialRouteName: "UserHostInbox",
    contentComponent: ({ navigation }) => (
      <DrawerContentComponent
        initialRoute="UserHostInbox"
        navigation={navigation}
      />
    ),
    drawerPosition: "left",
    drawerWidth: Dimensions.get("window").width - 100,
  }
);
const HostDrawer = createDrawerNavigator(
  {
    HostInbox: myBottomTab,
    profile: { screen: (props) => <Profile initialRoute={"HostInbox"} /> },
    booking: Booking,
    // book: Book,
    // map: Map,
    Logout: Logout,
    NewEvent: {
      screen: createStacks({ NewEvent: NewEvent }, ""),
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    userTab: {
      screen: userBottomTab,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    HostEventdetaila: {
      screen: createStacks({ HostEventdetail: EventDetail }, ""),
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    EventRequest: {
      screen: createStacks({ EventRequests: EventRequest }, ""),
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    EditEvents: {
      screen: createStacks({ EditEvent: EditEvent }, ""),
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    bookEvents: {
      screen: userBottomTabs,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    bookEvent: {
      screen: userBottomTab,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
  },
  {
    initialRouteName: "HostInbox",
    contentComponent: ({ navigation }) => (
      <DrawerContentComponent
        initialRoute="HostInbox"
        navigation={navigation}
      />
    ),
    drawerPosition: "left",
    drawerWidth: Dimensions.get("window").width - 100,
  }
);
export const switchNavigator = createSwitchNavigator(
  {
    Auth: createStackNavigator(
      {
        signin: {
          screen: Signin,
          navigationOptions: {
            headerBackTitle: null,
            headerStyle: {
              height: Platform.OS === "ios" ? 68 : 78,
              // paddingBottom: 12,
              backgroundColor: "transparent",
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
              borderBottomWidth: 0,
            },
            headerTransparent: {
              position: "absolute",
            },
            headerTitleStyle: {
              flexGrow: 1,
              alignSelf: "center",
            },
            headerTintColor: "#fff",
          },
        },
        signup: {
          screen: Signup,
          navigationOptions: {
            title: "Sign Up",
            headerTitleStyle: {
              // textAlign: 'center',
              color: "white",
              flex: 1,
              alignSelf: "center",
            },
            headerStyle: {
              backgroundColor: THEME_COLOR,
              height: 80,
            },
            headerTintColor: "#fff",
          },
        },
        forget: {
          screen: Forget,
          navigationOptions: {
            headerBackTitle: null,
            headerStyle: {
              height: Platform.OS === "ios" ? 68 : 78,
              // paddingBottom: 12,
              backgroundColor: "transparent",
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
              borderBottomWidth: 0,
            },
            headerTransparent: {
              position: "absolute",
            },
            headerTitleStyle: {
              flexGrow: 1,
              textAlign: "center",
            },
            headerTintColor: "#fff",
          },
        },
      },
      {
        // initialRouteName:'Super Host Login',
      }
    ),
    UserApp: UserDrawer,
    HostApp: HostDrawer,
    UserHostApp: UserHostDrawer,
  },
  {
    initialRouteName: "Auth",
  }
);

export default createAppContainer(switchNavigator);
