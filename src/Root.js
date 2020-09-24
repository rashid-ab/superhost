import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/index';
import Navigation from './components/Navigation';

const store = createStore(reducer);

export default class Root extends Component{
render() {
    return(
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
  }
}