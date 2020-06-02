/*
 *   Copyright (c) 2020 Victor Crudu
 *   All rights reserved.
 */

import React, { Component } from 'react'
import { View } from 'react-native'
import {
    Container,
    Content,
    Button,
    Input,
    Item,
    Text
} from 'native-base'
import Auth from '@aws-amplify/auth';
import {styles} from './styles'
import {ActionMessage, ErrorMessage} from '../utils/component_utils'
import {isEmailValid, isPasswordValid} from '../utils/validation'
import { Alert } from "react-native";


export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            signinSuccess: true,
            signinErrorMessage: '',
            validation: false
        }

        this.setSigninSuccess = this.setSigninSuccess.bind(this)
        this.setSigninErrorMessage = this.setSigninErrorMessage.bind(this)
        this.signIn = this.signIn.bind(this)
    }

    onEmailChange(value) {
        this.setState({
            email: value
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

    setSigninErrorMessage(error) {
        if(error.code == "UserNotConfirmedException")
        {
            Alert.alert(
                "Warning",
                "You need to confirm the registration with a confirmation code that you have received. Resend the confirmation code if you do not have one.",
                [
                  { text: "OK", onPress: () => this.props.navigation.push("ConfirmCode")}
                ],
                { cancelable: false }
              )
        }
        this.setState({
            signinErrorMessage: error.message
        })
    }

    signIn() {
        this.setState({
            validation: true
        })
        if(!isEmailValid(this.state.email) || 
            !isPasswordValid(this.state.password)) return

        Auth.signIn(this.state.email, this.state.password)
            .then(success => {
                this.props.navigation.push('Home')
            })
            .catch(err => this.setSigninErrorMessage(err));
    }

    render() { 
        return (
            <Container style={styles.container}>
                <Content>
                    <Text style={styles.h3}>Sign in to your account</Text>
                    <View style={{ marginTop: 30 }}>
                        <Text>Email *</Text>
                        <Item regular style={{ marginTop: 10 }}>
                            <Input
                                placeholder='Enter your username'
                                value={this.state.email}
                                onChangeText={this.onEmailChange.bind(this)} />
                        </Item>
                    </View>
                    <ErrorMessage show={this.state.validation && !isEmailValid(this.state.email)}>
                            Email is not valid
                            </ErrorMessage>
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
                    <ErrorMessage show={this.state.validation && !isPasswordValid(this.state.password)}>
                            Password is not valid
                            </ErrorMessage>
                    <View style={{ marginTop: 10 }}>
                        <Button disabled={!this.state.email || !this.state.password} onPress={this.signIn} style={{ marginTop: 10, height: 50 }} block><Text> SIGN IN </Text></Button>
                    </View>
                    <View style={styles.additionalOptions}>
                        <Text style={styles.link} onPress={()=>this.props.navigation.push('SignUp')}>Forgot Password</Text>
                        <Text style={styles.link} onPress={()=>this.props.navigation.push('SignUp')}>Sign Up</Text>
                    </View>
                    <ActionMessage show={this.state.signinErrorMessage} text={this.state.signinErrorMessage}/>
                </Content>
            </Container>
        )
    }
}