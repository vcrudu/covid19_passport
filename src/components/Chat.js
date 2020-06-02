/*
 *   Copyright (c) 2020 Victor Crudu
 *   All rights reserved.
 */
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {View, Header, Body, Title} from 'native-base'

export default class Chat extends React.Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 0,
          text: 'New room created.',
          createdAt: new Date().getTime(),
          system: true
        },
        {
          _id: 1,
          text: 'Hi John. You COVID19 passport is available in QRCode tab bellow.',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        },
        {
          _id: 3,
          text: 'Henlo!',
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: 'Test User'
          }
        }
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        isAnimated = {true}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}