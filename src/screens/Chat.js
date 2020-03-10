import React, { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/core";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text } from "react-native";
import { Composer } from "react-native-gifted-chat";
import FirebaseContext from "../firebase/FirebaseContext";

import Messages from "../../src/firebase/services/messageService";

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
  const [connectedUser, setConnectedUser] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const { user, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    setConnectedUser(route.params.connectedUser);
    setCurrentUser(route.params.serviceUser);
    //console.log("---------");
    //console.log(connectedUser);
    console.log(currentUser.uid);

    // myMessages.push({
    //   _id: 1,
    //   text: "Salut M. ...",
    //   createdAt: new Date(),
    //   user: {
    //     _id: serviceUserId,
    //     name: "React Native",
    //     avatar: "https://placeimg.com/140/140/any"
    //   }
    // });

    // const msgData = firebase.db
    //   .collection("messages")
    //   .get()
    //   .then(querySnapshot => {
    //     console.log("-------------- Deb ------------------------");
    //     console.log(querySnapshot);
    //     console.log("--------------- Fin -----------------------");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    let messRef = firebase.db.collection("messages");
    let query = messRef
      // .where("_id", "==", "XXXXXXX")
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        //console.log("-------------- Deb ------------------------");

        snapshot.forEach(doc => {
          //console.log(doc.id, "=>", doc.data());
        });
        //console.log("-------------- Fin ------------------------");
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }, []);

  const onSend = message => {
    let msg = [...myMessages];
    msg.unshift(message[0]);
    setMyMessages(msg);

    firebase.addMessage(message);
    //Messages.addMessage(message[0]);
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
        _id: connectedUser.uid,
        _id2: connectedUser.uid,
        //_id2: currentUser.uid,
        createdAt: new Date(),
        name: "connectedUser.pseudo"
      }}
    />
  );
};

export default ChatScreen;
