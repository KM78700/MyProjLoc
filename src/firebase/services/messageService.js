import firebase from "../firebase";
import FirebaseContext from "../FirebaseContext";

export default Messages = () => {
  const { user, firebase } = useContext(FirebaseContext);
  function addMessage(message) {
    console.log(message);
    let addDoc = firebase.db
      .collection("messages")
      .add(message)
      .then(ref => {
        console.log("Added message with ID: ", ref.id);
      });
  }
};
