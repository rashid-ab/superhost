import React, {Component} from 'react';
import { View, Text, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';
import style from '../styles/Map';

export default class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            marker:{
                latitude: 37.78825,
                longitude: -122.4324
            }
        }
    }

    componentDidMount(){

    }

    onRegionChange= (region) => {
        this.setState({ region });
    }

    render(){
        return(
            <View style={style.container}>
                <MapView style={style.map}
                    ref="map"
                    initialRegion={this.state.region}
                    // onRegionChange={(pos)=>{this.onRegionChange(pos)}}
                    onRegionChangeComplete={(pos)=>{this.onRegionChange(pos)}}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    >
                    <Marker ref={ref => { this.mark = ref; }} coordinate={this.state.marker} title={"Event Title"} >
                        <Callout tooltip={true} style={style.callout}>
                            <Text style={{color: 'white', fontSize: 12, paddingHorizontal: 8}}>Event Title</Text>
                        </Callout>
                    </Marker>
                </MapView>
            </View>
        );
    }
}