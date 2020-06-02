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
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles'

import { isEmailValid } from '../utils/validation'
import {ActionMessage, ErrorMessage} from '../utils/component_utils'
import { Alert } from "react-native";

export default class ResendCode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            validation: false,
            actionMessage: '',
        }

        this.setSigninSuccess = this.setSigninSuccess.bind(this)
        this.setActionMessage = this.setActionMessage.bind(this)
        this.resendConfirmationCode = this.resendConfirmationCode.bind(this)
    }

    onUsernameChange(value) {
        this.setState({
            email: value
        })
    }

    setSigninSuccess(value) {
        this.setState({
            signinSuccess: value
        })
    }

    setActionMessage(value) {
        this.setState({
            actionMessage: value
        })
    }

    async resendConfirmationCode() {
        this.setState({
            validation: true
        })
        if(!isEmailValid(this.state.email)) return
        try {
            await Auth.resendSignUp(this.state.email)
            Alert.alert(
                "Message",
                "The code has been resent succesfully.",
                [
                  { text: "OK", onPress: () => this.props.navigation.push("ConfirmCode")}
                ],
                { cancelable: false }
              )
            console.log('code resent succesfully');
        } catch (err) {
            console.log('error resending code: ', err)
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
                                onChangeText={this.onUsernameChange.bind(this)} />
                        </Item>
                    </View>
                    <ErrorMessage show={this.state.validation && !isEmailValid(this.state.email)}>
                            Email is not valid
                            </ErrorMessage>
                    <View style={{ marginTop: 10 }}>
                        <Button disabled={!this.state.email} onPress={this.resendConfirmationCode} style={{ marginTop: 10, height: 50 }} block><Text> RESEND CODE </Text></Button>
                    </View>
                    <View style={styles.additionalOptions}>
                        <Text style={styles.link} onPress={() => this.props.navigation.push('Login')}>Back to Sign In</Text>
                    </View>
                    <ActionMessage show={this.state.actionMessage} text={this.state.actionMessage}/>
                </Content>
            </Container>
        )
    }
}