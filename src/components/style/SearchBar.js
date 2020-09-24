import {StyleSheet} from 'react-native';
export default StyleSheet.create({ 
    fieldContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        height: 50,
        backgroundColor: '#F0F0F0'
    },
    iconContainer:{
        justifyContent: 'center',
        alignItems:'center',
        marginLeft: 8,
        height: 40,
        width: '8%',
    },
    icon:{
        aspectRatio: 23/23,
        width: undefined,
        height:'55%'
    },
    input:{
        width:'92%',
        fontSize: 17
    }
})