import React, {Component} from 'react';
import { View, Image, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import {THEME_COLOR} from '../components/colors';
import style from '../styles/Profile';

export default class ProfileField extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={style.fieldContainer}>
        <View style={style.iconContainer}>
          <Icon name={this.props.iconName} type={this.props.type} size={18} color={THEME_COLOR} />
        </View>
        <TextInput
          name={this.props.name}
          value={this.props.value}
          ref={this.props.refs}
          onChangeText={(text)=> this.props.inputAction(text)}
          keyboardType={this.props.keyboardType}
          returnKeyType='next'
          returnKeyLabel='next'
          autoCapitalize='none'
          placeholder={this.props.placeholder}
          onSubmitEditing={this.props.onSubmitEditing}
          style={style.field}
        />
      </View>
    );
  }
}