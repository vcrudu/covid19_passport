/*
 *   Copyright (c) 2020 Victor Crudu
 *   All rights reserved.
 */

import React, { Component } from 'react'
import { Text } from 'native-base'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export function withVisibility(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props)
        }

        render() {
            return (
                this.props.show ?
                    <WrappedComponent {...this.props}></WrappedComponent> :
                    null
            )
        }
    }
}

function ActionMessageImplementation(props){
       return <View style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        }}>
            <Text>
                <Icon name="warning" color="#db415d" /> {props.text}
            </Text>
        </View>
}

export const ActionMessage = withVisibility(ActionMessageImplementation)

function ErrorMessageImplementation(props) { 
    return <Text style={{
        color:'#e99d48',
        fontSize: 14,
        alignSelf: 'center'
    }}>{props.children}</Text> 
}
export const ErrorMessage = withVisibility(ErrorMessageImplementation)
