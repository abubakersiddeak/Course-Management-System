"use client";
import React from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "@/context/context";

import { useEffect, useState } from "react";
import { auth } from "@/app/lib/firebase.config";

const GoogleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const SiginupUser = (email, password) => {
    console.log("clg from ingupUser furntion", email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signout = () => signOut(auth);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signupWithGoogle = () => signInWithPopup(auth, GoogleProvider);

  const ubdateUser = (user, { displayName, photoURL }) => {
    if (!user) return;
    return updateProfile(user, { displayName, photoURL });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  console.log(currentUser);
  const authInfo = {
    SiginupUser,
    currentUser,
    signout,
    loginUser,
    loading,
    setLoading,
    signupWithGoogle,
    ubdateUser,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
