import firebaseConfig from "./config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//--- Universally Unique IDentifiers
import uuid from "uuid";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.db = app.firestore();
  }

  //--- Email Login
  loginEmail = async (email, password) => {
    await this.auth.signInWithEmailAndPassword(email, password);
  };

  //-- Google login
  loginGoogle = async () => {
    const { user } = await this.auth.signInWithPopup(this.googleProvider);
    //console.log("Google login: " + user);
  };

  //-- LogOut
  logOut = async () => await this.auth.signOut();

  //--- Add post
  uploadPost = async description => {
    const id = uuid.v4();

    //--- upload post
    const upload = {
      id: id,
      postPhoto:
        "https://firebasestorage.googleapis.com/v0/b/start-c1a32.appspot.com/o/koala.jpg?alt=media&token=57861261-d7f9-44c8-8c86-8c296f1c06d8",
      postDescription: description
    };
    await this.db
      .collection("posts")
      .doc(id)
      .set(upload);
  };

  //--- New user
  SignupUser = async (email, password) => {
    const response = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (response.user.uid) {
      const user = {
        uid: response.user.uid,
        email: email,
        username: "username",
        bio: "bio",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/myproj2-634bf.appspot.com/o/portrait.png?alt=media&token=1316cdcc-1de2-4cef-83d0-8ce66cabb1dc",
        token: null
      };
      this.db
        .collection("users")
        .doc(response.user.uid)
        .set(user);
    }
  };

  //---- fin class Firebase
}

const firebase = new Firebase();
export default firebase;
