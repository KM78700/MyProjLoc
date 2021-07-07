import { useState, useEffect } from "react";
import firebase from "../firebase/firebase";

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscibe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);

      } else {
        setAuthUser(null);

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
