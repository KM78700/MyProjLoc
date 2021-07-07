import React, { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/core";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text } from "react-native";
import { Composer } from "react-native-gifted-chat";
import FirebaseContext from "../firebase/FirebaseContext";
import Messages from "../../src/firebase/services/messageService";

const ChatScreen = props => {
  const route = useRoute();
  const [myMessages, setMyMessages] = useState([]);
  const [connectedUser, setConnectedUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const { user, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    setConnectedUser(route.params.connectedUser);
    setCurrentUser(route.params.currentUser);
    //setMyMessages([]);
    let messRef = firebase.db
      .collection("messages")
      .orderBy("createdAt", "desc");
    let query = messRef
      // .where("_id", "==", "XXXXXXX")
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => {
          // console.log(doc.id, "=>", doc.data());
          myMessages.push({
            _id: doc.data()._id2,
            text: doc.data().text,
            createdAt: new Date(),
            user: {
              _id: doc.data()._id,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any"
            }
          });
        });
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
  };

  return (
    <GiftedChat
      label="Envoyer"
      alwaysShowSend={true}
      messages={myMessages}
      onSend={messages => onSend(messages)}
      placeholder="Messace text"
      user={{
        _id: connectedUser.uid,
        _id2: currentUser.uid,
        email: connectedUser.email,
        email2: currentUser.email,
        createdAt: new Date(),
        name: "connectedUser.pseudo"
      }}
    />
  );
};

export default ChatScreen;
