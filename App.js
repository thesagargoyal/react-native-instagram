import { StatusBar } from 'expo-status-bar';
import React, { Component }from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import firebase from "firebase";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

var firebaseConfig = {
  apiKey: "AIzaSyAtcH0EF6tfg-Obu62fn8jaUrX9R6f-GTY",
  authDomain: "react-native-instagram-1eabf.firebaseapp.com",
  projectId: "react-native-instagram-1eabf",
  storageBucket: "react-native-instagram-1eabf.appspot.com",
  messagingSenderId: "27071536944",
  appId: "1:27071536944:web:7c61e9b7593ebc7de532f5"
};

if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main';

const Stack = createStackNavigator();

export class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        });
      }else{
        this.setState({
          loggedIn: true,
          loaded: true
        });
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;

    if(!loaded){
      return <View style={{
        flex: 1,
        justifyContent: 'center',
      }}>
        <Text>Loading</Text>
      </View>;
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing" >
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    );
  }
}

export default App

