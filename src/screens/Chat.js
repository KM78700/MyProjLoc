import React, { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/core";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text } from "react-native";
import { Composer } from "react-native-gifted-chat";
import FirebaseContext from "../firebase/FirebaseContext";

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
  const [connectedUserId, setConnectedUserId] = useState("");
  const [serviceUserId, setServiceUserId] = useState("");
  const { user, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    setConnectedUserId(route.params.connectedUser.uid);
    setServiceUserId(route.params.serviceUser.uid);

    myMessages.push({
      _id: 1,
      text: "Salut M. ...",
      createdAt: new Date(),
      user: {
        _id: serviceUserId,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any"
      }
    });
  }, []);

  const onSend = message => {
    let msg = [...myMessages];
    msg.unshift(message[0]);
    setMyMessages(msg);
    firebase.addMessage(message[0]);
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
        _id: connectedUserId,
        createdAt: new Date(),
        name: "Ridha"
      }}
    />
  );
};

export default ChatScreen;
