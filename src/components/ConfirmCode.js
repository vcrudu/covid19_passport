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
import {isEmailValid, isCodeValid} from '../utils/validation'
import { Alert } from "react-native";


export default class ConfirmCode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            code: '',
            signinSuccess: true,
            actionMessage: ''
        }

        this.setSigninSuccess = this.setSigninSuccess.bind(this)
        this.setSigninErrorMessage = this.setSigninErrorMessage.bind(this)
        this.confirmSignUp = this.confirmSignUp.bind(this)
    }

    onEmailChange(value) {
        this.setState({
            email: value
        })
    }

    onCodeChange(value) {
        this.setState({
            code: value.replace(/[^0-9]/g, '')
        })
    }

    setSigninSuccess(value) {
        this.setState({
            signinSuccess: value
        })
    }

    setSigninErrorMessage(error) {
        this.setState({
            actionMessage: error.message
        })
    }

    async confirmSignUp() {
        this.setState({
            validation: true
        })

        if(!isEmailValid(this.state.email) || 
            !isCodeValid(this.state.code)) return

        try {
          await Auth.confirmSignUp(this.state.email, this.state.code);
          Alert.alert(
            "Information",
            "The account was activated successfuly.",
            [
              { text: "OK", onPress: () => this.props.navigation.push('Login')}
            ],
            { cancelable: false }
          )
        } catch (error) {
            this.setSigninErrorMessage(error)
            console.log('error confirming sign up', error);
        }
    }

    render() {        
        return (
            <Container style={styles.container}>
                <Content>
                    <Text style={styles.h3}>Confirm Sign Up</Text>
                    <View style={{ marginTop: 30 }}>
                        <Text>Email *</Text>
                        <Item regular style={{ marginTop: 10 }}>
                            <Input
                                placeholder='Enter your email'
                                value={this.state.email}
                                onChangeText={this.onEmailChange.bind(this)} />
                        </Item>
                    </View>
                    <ErrorMessage show={this.state.validation && !isEmailValid(this.state.email)}>
                            Email is not valid
                    </ErrorMessage>
                    <View style={{ marginTop: 30 }}>
                        <Text>Confirmation Code *</Text>
                        <Item regular style={{ marginTop: 10 }}>
                            <Input
                                placeholder='Enter your confirmation code'
                                value={this.state.code}
                                onChangeText={this.onCodeChange.bind(this)} />
                        </Item>
                    </View>
                    <ErrorMessage show={this.state.validation && !isCodeValid(this.state.code)}>
                            Code is not valid
                    </ErrorMessage>
                    <View style={{ marginTop: 10 }}>
                        <Button disabled={!this.state.code || !this.state.email} onPress={this.confirmSignUp} style={{ marginTop: 10, height: 50 }} block><Text> CONFIRM </Text></Button>
                    </View>
                    <View style={styles.additionalOptions}>
                        <Text style={styles.link} onPress={()=>this.props.navigation.push('ResendCode')}>Resend Code</Text>
                        <Text style={styles.link} onPress={()=>this.props.navigation.push('Login')}>Back to Sign In</Text>
                    </View>
                    <ActionMessage show={this.state.actionMessage} text={this.state.actionMessage}/>
                </Content>
            </Container>
        )
    }
}