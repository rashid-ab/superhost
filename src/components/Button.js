import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {THEME_COLOR} from '../components/colors';

export default class Button extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity disabled={this.props.isLoading} onPress={()=>this.props.handleAction(this.props.actionType, null)} style={style.button}>
                    {!this.props.isLoading?
                    <>
                        {this.props.icon && <Icon name={this.props.icon} size={20} style= {{color:'white', paddingRight: 5}} />}
                        <Text style={{color: 'white', fontSize: 18}}>{this.props.text}</Text>
                    </>:<ActivityIndicator size="small" color="white" />
                    }
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    button:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        alignSelf: 'center',
        width: '75%',
        backgroundColor: THEME_COLOR
    }
})