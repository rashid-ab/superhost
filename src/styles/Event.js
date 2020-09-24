import {StyleSheet} from 'react-native';
export default StyleSheet.create({ 
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 65,
        backgroundColor: '#02006D',
        // backgroundColor: 'yellow',
    },
    backButton:{
        justifyContent: 'center',
        alignItems: 'center',
        width:'10%',
        height: 65,
        // backgroundColor: 'red',
    },
    subjectContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingRight: 2,
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdde1',
    },
    senderReceiverContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdde1',
        height: 90,
        // backgroundColor: 'blue'
    },
    namesContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 90,
        width: '82%',
        // backgroundColor: 'yellow'
    },
    avatarContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        width: '18%',
        // backgroundColor: 'green'
    },
    avatar:{
        height:45,
        width:45,
        overflow: "hidden",
        borderRadius: 45/2,
    },
    messageContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 30,
        paddingLeft: 12,
        paddingRight: 20,
        paddingBottom: 11,
        // backgroundColor: 'red',
    }
})