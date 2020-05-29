/*
 *   Copyright (c) 2020 Victor Crudu
 *   All rights reserved.
 */

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

import {AppRegistry} from 'react-native';
import App from './src/components/App';
import Login from './src/components/Login';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Login);
