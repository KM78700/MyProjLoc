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

  /* ------------------  AUTHENTIFICATION -----------------*/
  //--- Login Email
  loginEmail = async (email, password) => {
    await this.auth.signInWithEmailAndPassword(email, password);
  };

  //-- login Google
  loginGoogle = async () => {
    const { user } = await this.auth.signInWithPopup(this.googleProvider);
    //console.log("Google login: " + user);
  };

  //-- LogOut
  logOut = async () => await this.auth.signOut();

  //-- Signup
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

  // checkAuth = () => {
  //   this.auth().onAuthStateChange(user => {
  //     if (!user) {
  //       this.auth().signInAnonymously();
  //     }
  //   });
  // };

  // send = message => {
  //   item => {
  //     const message = {
  //       text: item.text,
  //       timestamp: this.database.serverValue.TIMESTAMP,
  //       user: item.user
  //     };
  //     this.db.push(message);
  //   };
  // };
  // get db() {
  //   return this.database().ref("message");
  // }
  /* ------------------  POST -----------------*/
  //--- addPost
  uploadPost = async description => {
    const id = uuid.v4();

    //--- upload
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

  /* ------------------  AVIS ----------------- */
  //--- addAvis
  addAvis = async item => {
    const id = uuid.v4();

    await this.db
      .collection("avis_services")
      .doc(id)
      .set(item)
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function() {
        console.log("Error writing document", error);
      });
  };

  //--- readAvis
  readAvis = async () => {
    await this.db
      .collection("avis_services")
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //---- fin class Firebase
}

const firebase = new Firebase();

export default firebase;
