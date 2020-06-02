/*
 *   Copyright (c) 2020 Victor Crudu
 *   All rights reserved.
 */

import {StyleSheet } from 'react-native'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units'

export const styles = StyleSheet.create({
    container: {
        paddingTop: vh(5),
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
    },
    error:{
        color:'#e99d48',
        fontSize: 14,
        alignSelf: 'center'
    },
    link: {
        color: '#1966fb'
    }
})