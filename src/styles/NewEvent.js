import {StyleSheet, Platform, Dimensions} from 'react-native';
import {AUTH_LINE_COLOR} from '../components/colors';

export default StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        // backgroundColor: '#ffffff',
    },
    fieldsContainer:{
        flexDirection: 'column',
        // alignItems: "center",
        // justifyContent: "center",
        flex:.4,
        paddingTop:20,
        // backgroundColor: "#a4b32e",
    },
    field:{
        width: '100%',
        fontSize: 16,
        paddingTop: 15,
        marginTop:10,
        paddingLeft: 1,
        paddingVertical: 10,
        // padding: 0,
        color: 'black',
        borderBottomColor:AUTH_LINE_COLOR,
        borderBottomWidth: 1,
    },
    priceInput:{
        width: '100%',
        fontSize: 14,
        paddingTop: 15,
        paddingLeft: 1,
        paddingVertical: 10,
        // padding: 0,
        color: 'black',
        borderBottomColor:AUTH_LINE_COLOR,
        borderBottomWidth: 1,
    },
    InputFile_container:{
        paddingTop: 27,
        // paddingVertical: 10,
        paddingRight:5,
        borderBottomWidth:1,
        borderBottomColor:'#ededed'
    },
    ImageBoxes:{
        backgroundColor:'#f7f7f7',
        padding:30,

    },
    iconBoxes:{
        backgroundColor:'#f7f7f7',
        paddingVertical:20,
        paddingHorizontal:30,

    },
    dateBox:{
        
        paddingVertical:2,
        flex:.33

    }
})
