import {StyleSheet, Platform, Dimensions} from 'react-native';
import {AUTH_LINE_COLOR} from '../components/colors';

export default StyleSheet.create({
    // container:{
    //     flex: 1,
    //     flexDirection: "column",
    //     // backgroundColor: '#030049',
    // },
    // logoContainer:{
    //     flexDirection: "row",
    //     alignItems: "flex-start",
    //     justifyContent: "flex-start",
    // },
    // logo:{
    //    aspectRatio: 218/146,
    //    height:undefined,
    //    width:"35%",
    //    marginLeft: 15,
    //    marginTop: Platform.OS==='android'?40:13,
    // },
    // centerContainer:{
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginTop: 100,
    //     height: 100,
    //     // backgroundColor: "#a4b32e",
    // },
    // field:{
    //     width: '80%',
    //     fontSize: 14,
    //     textAlign: "center",
    //     paddingTop: 30,
    //     paddingVertical: 5,
    //     // padding: 0,
    //     color: 'white',
    //     borderBottomColor: AUTH_LINE_COLOR,
    //     borderBottomWidth: 1,
    // },
    // reminderContainer:{
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginTop: 70,
    //     height: 50,
    //     // backgroundColor: "#a4b0be",
    // },
    // bottomContainer:{
    //     justifyContent: 'center',
    //     alignItems: "center",
    //     position: 'absolute',
    //     height: 70,
    //     bottom: 0,
    //     width: Dimensions.get('window').width,
    //     backgroundColor: '#02006D',
    // }
    container:{
        flex: 1,
        flexDirection: "column",
        // backgroundColor: '#ffffff',
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
        flex:.4,
        // backgroundColor: "#a4b32e",
    },
    field:{
        width: '80%',
        fontSize: 16,
        paddingTop: 35,
        paddingVertical: 5,
        color: 'white',
        borderBottomColor:AUTH_LINE_COLOR,
        borderBottomWidth: 1,
    },
    InputFile_container:{
        paddingTop: 35,
        paddingVertical: 5,
        paddingRight:5,borderBottomWidth:1,
        borderBottomColor:AUTH_LINE_COLOR
    },
    signupContainer:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        height: 50,
        // backgroundColor: "#a4b0be",
    },
    bottomContainer:{
        justifyContent: 'center',
        alignItems: "center",
        position: 'absolute',
        height: 70,
        bottom: 0,
        width: Dimensions.get('window').width,
        backgroundColor: '#02006D'
    },
    socialIcons:{
        width:60,
        height:60
    }
})