import React, {Component} from 'react';
import {useNetInfo} from "@react-native-community/netinfo";
import { View} from 'react-native';
import { connect } from 'react-redux';
import {CHECK_INTERNET} from '../actions/actionTypes';

const checkInternet = (props) => {
  const netInfo = useNetInfo();
//   console.log("type:" +netInfo.type+ " Connected : "+ netInfo.isConnected+" Reachable: "+ netInfo.isInternetReachable + " Deatils: "+ netInfo.details);
  if(netInfo.type !== "unknown"){
    props.internetConnection(netInfo.isConnected.toString());
  }
  return(<View/>);
}
const mapStateToProps = state => ({
    connected: state.Connected,
})
const mapDispatchToProps =dispatch => {
    return { 
        internetConnection: (status) => {dispatch({type: CHECK_INTERNET, payload:status})},
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(checkInternet); 