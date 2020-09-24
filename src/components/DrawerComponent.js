import  React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import {THEME_COLOR} from '../components/colors';

class DrawerContentComponent extends Component{
  constructor(props){
    super(props);
    this.data=[ 
      [this.props.initialRoute,'Home'],
      ['profile','Profile'],
      // ['booking','Booking'],
      // ['book','Book'],
      // ['bookEvent','Book Event'],
      // ['map','Map'],
      ['Logout','Logout'],
    ]
  }
  render()
  {
    // console.log(this.props.image)
    return(
      <SafeAreaView style={style.container} forceInset={{ top: 'always', bottom: 'always'}}>
        <View style={style.top}>
          {this.props.image == 'null'?<Image style={style.image} source={require('../images/signup.png')} />:<Image style={style.image} source={{uri:this.props.image}} />}
          <Text style={{fontSize: 18, color: 'white', paddingLeft: 10}}>{this.props.username}</Text>
        </View>
        <View>
          {this.data.map((row)=>
            <TouchableOpacity key={row[0]} onPress={()=>{this.props.navigation.navigate(row[0])}} style={style.item}>
              <Text style={{fontSize: 18}}>{row[1]}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 1, position: 'absolute', bottom: 8, left: 30}}>
          <Text style={{fontSize: 18, color: '#A9A9A9'}}>Super Host</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  image: state.image,
  username: state.username
})
export default connect(
  mapStateToProps, null
)(DrawerContentComponent);

const style = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
  },
  top:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 120,
    backgroundColor: THEME_COLOR
  },
  image:{
    aspectRatio: 512/512,
    width: 80,
    height: undefined,
    borderRadius:70,
    marginLeft: 10,
  },
  item:{
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30,
    height: 70,
  }
})