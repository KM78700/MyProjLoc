import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";

class ChatScreen extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Salut M. le proprio",
          createdAt: new Date(),

          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        placeholder="Messace text"
        user={{
          _id: 1,
          name: "Ridha"
        }}
      />
    );
  }
}

export default ChatScreen;
