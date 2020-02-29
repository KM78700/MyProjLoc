import { useState, useEffect } from "react";
import firebase from "../firebase/firebase";

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscibe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
        console.log("-------");
        console.log("User : " + user.email + " connecté");
      } else {
        setAuthUser(null);
        console.log("-------");
        console.log("User déconnecté");
      }
    });
    return () => unsubscibe;
  }, []);

  return authUser;
};

export default useAuth;

/*
#A utiliser dans les autres screens
#Utilisateur authentifié => Utilistaion des fonctionnalitées 
import useAuth from "../hooks/useAuth";
const user = useAuth();
{user ? <composant1 /> : <composant2 /> }
*/
