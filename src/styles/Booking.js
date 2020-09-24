import {StyleSheet, Dimensions} from 'react-native';
import {BG_COLOR} from '../components/colors';

export default StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BG_COLOR,
    },
    titleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 35,
        marginBottom: 50,
    },
    image:{
        marginLeft: 17,
        aspectRatio: 512/512,
        width: '22%',
        height: undefined
    },
    titleInnerContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        width: Dimensions.get('window').width -100,
        paddingLeft: 5,
    },
    tableHeaderContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonContainer:{
        position: 'absolute',
        height: 50,
        bottom: 30,
        width: '100%',
    }
})