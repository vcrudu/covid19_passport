/*
 *   Copyright (c) 2020 Victor Crudu
 *   All rights reserved.
 */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Input,
    Item,
    Text
} from 'native-base'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'
import Auth from '@aws-amplify/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        paddingTop: vh(10),
        paddingLeft: vw(4),
        paddingRight: vw(4)
    },
    h3: {
        fontSize: 21
    },
    additionalOptions: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    message: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            signinSuccess: true,
            signinErrorMessage: ''
        }

        this.setSigninSuccess = this.setSigninSuccess.bind(this)
        this.setSigninErrorMessage = this.setSigninErrorMessage.bind(this)
        this.signIn = this.signIn.bind(this)
    }

    onUsernameChange(value) {
        this.setState({
            username: value
        })
    }

    onPasswordChange(value) {
        this.setState({
            password: value
        })
    }

    setSigninSuccess(value) {
        this.setState({
            signinSuccess: value
        })
    }

    setSigninErrorMessage(value) {
        this.setState({
            signinErrorMessage: value
        })
    }

    signIn() {
        Auth.signIn(this.state.username, this.state.password)
            .then(success => this.setSigninSuccess(true))
            .catch(err => this.setSigninErrorMessage(err));
    }

    render() {
        let message = this.state.signinErrorMessage ? (
                <View style={styles.additionalOptions}>
                    <Text>
                        <Icon name="warning" color="#db415d" /> User does not exist
                    </Text>
                </View>) : null
        
        return (
            <Container style={styles.container}>
                <Content>
                    <Text style={styles.h3}>Sign in to your account</Text>
                    <View style={{ marginTop: 30 }}>
                        <Text>Username *</Text>
                        <Item regular style={{ marginTop: 10 }}>
                            <Input
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChangeText={this.onUsernameChange.bind(this)} />
                        </Item>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text>Password *</Text>
                        <Item regular style={{ marginTop: 10 }}>
                            <Input
                                placeholder='Enter your password'
                                secureTextEntry
                                value={this.state.password}
                                onChangeText={this.onPasswordChange.bind(this)} />
                        </Item>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Button onPress={this.signIn} style={{ marginTop: 10, height: 50 }} block><Text> SIGN IN </Text></Button>
                    </View>
                    <View style={styles.additionalOptions}>
                        <Text>Forgot Password</Text>
                        <Text>Sign Up</Text>
                    </View>
                    {message}
                </Content>
            </Container>
        )
    }
}