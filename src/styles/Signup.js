import {StyleSheet, Platform, Dimensions} from 'react-native';
import {AUTH_LINE_COLOR} from '../components/colors';
export default StyleSheet.create({ 
    container:{
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#ffffff',
    },
    logoContainer:{
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginBottom: 15,
        // backgroundColor :'white',
    },
    logo:{
       aspectRatio: 218/146,
       height:undefined,
       width:"35%",
       marginLeft: 15,
       marginTop: Platform.OS==='android'?40:13,
    },
    fieldsContainer:{
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        // flex:.6,
        // backgroundColor: "#a4b32e",
    },
    hobbyContainer:{
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        // flex:.6,
        // backgroundColor: "#a4b32e",
    },
    field:{
        width: '80%',
        fontSize: 16,
        paddingTop: 35,
        paddingVertical: 5,
        // padding: 0,
        color: 'black',
        borderBottomColor:AUTH_LINE_COLOR,
        borderBottomWidth: 1,
    },
    signupContainer:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        height: 50,
        // backgroundColor: "#a4b0be",
    },
    profileImage:{
        aspectRatio: 512/512,
        width: '35%',
        height: 130,
        borderRadius:70
    },
    bottomContainer:{
        justifyContent: 'center',
        alignItems: "center",
        position: 'absolute',
        height: 70,
        bottom: 0,
        width: Dimensions.get('window').width,
        backgroundColor: '#02006D'
    }
})