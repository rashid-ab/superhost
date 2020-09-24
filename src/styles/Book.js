import {StyleSheet, Dimensions} from 'react-native';
import {BG_COLOR} from '../components/colors';

export default StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BG_COLOR,
    },
    fieldContainer:{
        marginTop: 20,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#B8B8B8',
        alignSelf: 'center',
        width: '90%'
    },
    appleHeading:{
        flexDirection: 'row',
        alignItems:'center',
        alignSelf: 'center',
        width: '90%'
    },
    infoContainer:{
        alignSelf: 'center',
        marginTop: 25,
        width: '90%',
    },
    checkboxContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: 50,
        bottom: 100,
        alignSelf: 'center',
        width: '90%',
    },
    buttonContainer:{
        position: 'absolute',
        height: 50,
        bottom: 30,
        width: '100%',
    }
})