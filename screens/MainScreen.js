import React, { Component } from 'react';
import { AsyncStorage, View, Text, StyleSheet, Platform } from 'react-native';
import { Icon } from 'native-base';
import { TabNavigator } from 'react-navigation';
import HomeTab from './AppTabNavigator/HomeTab';
import CameraTab from './AppTabNavigator/CameraTab';
import ProfileTab from './AppTabNavigator/ProfileTab';

// create a component
class MainScreen extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  componentDidMount () {
    this.checkLoggedIn();
  }

  checkLoggedIn () {
      AsyncStorage.getItem('userEmail')
        .then(userEmail => {
          // console.log("Stored Email:");
          // console.log(userEmail);
          
          //if user is not logged in, boot back to login page
          //DISABLED FOR DEVELOPMENT
          // if(userEmail === null) {
          //   this.props.navigation.navigate('Login');
          // }
          //else, load the user's info...
        });
  }

  render() {
    return (
      <AppTabNavigator/>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default MainScreen;

const AppTabNavigator = TabNavigator({
  HomeTab: {
    screen: HomeTab
  },
  CameraTab: {
    screen: CameraTab
  },
  ProfileTab: {
    screen: ProfileTab
  }
}, {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: 'white'
          }
        })
      },
      activeTintColor: '#e8195b',
      inactiveTintColor: '#d1cece',
      showLabel: false,
      showIcon: true
    }
  })