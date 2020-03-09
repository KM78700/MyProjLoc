import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import { GiftedChat } from "react-native-gifted-chat";
import Firebase from "../firebase/firebase";
import { View, Text } from "react-native";
import { Composer } from "react-native-gifted-chat";

const renderComposer = props => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Composer {...props} />
      {/* <CustomImageButton />
      <CustomAttachButton /> */}
    </View>
  );
};

const renderSend = props => {
  if (!props.text.trim()) {
    // text box empty
    return;

    <View>
      {/* <AudioButton /> */}
      <Text>AudioButton</Text>
    </View>;
  }

  return;
  <View>
    {/* <SendTextButton /> */}
    <Text>SendTextButton</Text>
  </View>;
};

const ChatScreen = props => {
  const route = useRoute();
  const [myMessages, setMyMessages] = useState([]);
  useEffect(() => {
    const connectedUserId = route.params.connectedUser.uid;
    const serviceUser = route.params.serviceUser.uid;

    myMessages.push({
      _id: 1,
      text: "Salut M. le " + connectedUserId + " to " + serviceUser,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any"
      }
    });
  }, []);

  const onSend = message => {
    let msg = [...myMessages];
    msg.unshift(message[0]);
    setMyMessages(msg);
  };

  return (
    <GiftedChat
      label="Envoyer"
      alwaysShowSend={true}
      //renderComposer={renderComposer}
      //renderSend={renderSend}
      messages={myMessages}
      onSend={messages => onSend(messages)}
      placeholder="Messace text"
      user={{
        _id: 1,
        name: "Ridha",
        avatar: "https://placeimg.com/140/140/any"
      }}
    />
  );
};

export default ChatScreen;
