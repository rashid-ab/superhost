import {StyleSheet} from 'react-native';
import {PROFILE_BORDER_LINE, PROFILE_BUTTON_COLOR} from '../components/colors';

export default StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    imageContainer:{
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    profileIcon:{
        aspectRatio: 512/512,
        width: '25%',
        height: undefined
    },
    profileImage:{
        aspectRatio: 512/512,
        width: '30%',
        height: undefined,
        borderRadius:70,
    },
    fieldsContainer:{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    fieldContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor: PROFILE_BORDER_LINE,
        width:'90%',
    },
    field:{
        fontSize: 14,
        width:'90%',
        paddingVertical: 15,
    },
    iconContainer:{
        justifyContent: 'center',
        alignItems:'flex-start',
        height: 40,
        width: '7%',
    },
    BottomContainer:{
        justifyContent: 'flex-start',
        alignItems:'center',
        marginTop: 15
    },
    addressButton:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: PROFILE_BUTTON_COLOR,
        width: '93%',
        height: 25
    },
    reviewContainer:{
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
        width: '93%',
        marginTop: 10,
        backgroundColor: PROFILE_BUTTON_COLOR,
    },
    reviewRow:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        width: '98%',
    },
    reviewImage:{
        aspectRatio: 512/512,
        width: '13%',
        height: undefined,
        paddingBottom: 10
    },
    mapContainer:{
        height: 150,
        width: '93%'
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