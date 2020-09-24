import {StyleSheet, Dimensions} from 'react-native';
import {PROFILE_BORDER_LINE, PROFILE_BUTTON_COLOR} from '../components/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    callout:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 40,
        alignItems: 'center',
        backgroundColor: '#518DFE',
        borderRadius: 10,
        zIndex: 10
  }
})