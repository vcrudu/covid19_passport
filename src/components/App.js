/*
 *   Copyright (c) 2020 Victor Crudu
 *   All rights reserved.
 */
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { withAuthenticator } from 'aws-amplify-react-native'

import {globalStorage} from '../storage/globalStorage'

import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import ConfirmCode from './ConfirmCode'
import ResendCode from './ResendCode'

import {
  Text
} from 'native-base'

const Stack = createStackNavigator()

class App extends Component {
  headrLeftHandler(){
    return <></>
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="screen" initialRouteName={globalStorage.user?'Home':'Login'}>
          <Stack.Screen name="Login" component={Login} options={{ title: 'Sign in' }}/>
          <Stack.Screen name="ConfirmCode" component={ConfirmCode}  options={{ title: 'Confirm code' }} />
          <Stack.Screen name="ResendCode" component={ResendCode}  options={{ title: 'Resend code' }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign up' }}/>
          <Stack.Screen name="Home" component={Home} options={{
          headerLeft: () => (
            <Text/>
          ),
        }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App