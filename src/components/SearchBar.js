import React, {Component} from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import style from './style/SearchBar';

export default class searchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            input: ''
        }
    }
    render(){
        return(
            <View style={style.fieldContainer}>
                <View style={style.iconContainer}>
                    <Image style={style.icon} source={require('../images/search.png')}/>
                </View>
                <TextInput onChangeText={(input)=>this.setState({input: input})} onSubmitEditing={()=>this.props.search(this.state.input) } placeholder="Search" placeholderTextColor="black" returnKeyType="done" returnKeyLabel="done" autoCapitalize='none' style={style.input} />
            </View>
        )
    }
}