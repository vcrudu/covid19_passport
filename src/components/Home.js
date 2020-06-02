/*
 *   Copyright (c) 2020 Victor Crudu
 *   All rights reserved.
 */
import React from 'react'
import Chat from './Chat'
import QRCode from './QRCode'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator()


export default class Home extends React.Component {

  componentDidMount() {

    this.props.navigation.dispatch(state => {
      // Remove the home route from the stack

      return CommonActions.reset({
        ...state,
        routeKeyHistory: []
      });
    });
  }

  render() {
    return (
        <Tab.Navigator initialRouteName={'Chat'} >
          <Tab.Screen name="Chat" component={Chat} />
          <Tab.Screen name="QRCode" component={QRCode} />
        </Tab.Navigator>
    )
  }
}