/*
 *   Copyright (c) 2020 Victor Crudu
 *   All rights reserved.
 */

import 'react-native-gesture-handler'
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

import {AppRegistry} from 'react-native';
import App from './src/components/App';
import Home from './src/components/Home';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
