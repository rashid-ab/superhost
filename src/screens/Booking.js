import React, {Component} from 'react';
import {View, Text, Image,  TouchableOpacity} from 'react-native';
import style from '../styles/Booking';
import Button from '../components/Button';
import {THEME_COLOR} from '../components/colors';

export default class Booking extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
        };
    }

    componentDidMount(){

    }

    handleAction = (actionType, text=null)=> {
        switch(actionType){
            case 'CONTINUE':
                this.setState({isLoading: true});
                break;
            default:
                break;
        }
    }

    render(){
        const rows = [['Guest', 2], ['53 x 2', '$106'], ['Total', '$106']];
        return(
            <View style={style.container}>
                <View style={style.titleContainer}>
                    <Image source={require('../images/signup.png')} style={style.image} />
                    <View style={style.titleInnerContainer}>
                        <Text numberOfLines={3} style={{fontSize: 24}}>Title</Text>
                        <Text numberOfLines={10} style={{fontSize: 24}}>Description</Text>
                    </View>
                </View>
                <View style={style.tableHeaderContainer}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: '50%', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: THEME_COLOR}}>Location</Text>
                        </View>
                        <View style={{width: '50%', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: THEME_COLOR}}>Date Time</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{height:3, marginTop: 2, backgroundColor: THEME_COLOR}} activeOpacity={1} />
                </View>
                <View style={{flexDirection: 'column', marginVertical: 28}}>
                    {rows.map((row, index) => {
                        return (<View key={index}  style={{flexDirection: 'row', paddingTop: 5}}>
                            <View style={{width: '50%', alignItems: 'center'}}>
                                <Text style={{fontSize: 20}}>{row[0]}</Text>
                            </View>
                            <View style={{width: '50%', alignItems: 'center'}}>
                                <Text style={{fontSize: 20}}>{row[1]}</Text>
                            </View>
                        </View>)
                    })}
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '73%'}}>
                    <TouchableOpacity style={{height:2, width: '100%', backgroundColor: '#B8B8B8'}} activeOpacity={1} />
                    <Text style={{textAlign: 'center', fontSize: 23, paddingTop: 5, width:'95%'}}>Please Introduce Your Self to your Superhost</Text>
                </View>
                <View style={style.buttonContainer}>
                    <Button isLoading={this.state.isLoading} handleAction={this.handleAction} actionType="CONTINUE" icon="check" text="Continue" />
                </View>
            </View>
        );
    }
}