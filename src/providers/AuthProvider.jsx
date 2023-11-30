import { createContext, useEffect, useState } from "react";

import PropTypes from 'prop-types';

import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";

import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            //------------START: jwt related code ---------
            //just when there is a user: send userinfo to server, receive
            // jwt token created from server, save the token into client side(local storage)
            if (currentUser) {
                //get token and store on client side
                const userInfo = { email: currentUser.email };
                axiosPublic.post("/jwt", userInfo).then((response) => {
                    if (response.data.token) {
                        localStorage.setItem("access-token", response.data.token);
                        setLoading(false);
                    }
                });
            } else {
                //when there is no user, remove the saved jwt token
                localStorage.removeItem("access-token");
                setLoading(false);
            }
            //------------END: jwt related code ---------

        });
        return () => {
            unSubscribe();
        };
    }, []);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        });
    }

    const authInfo = { user, createUser, loginWithGoogle, signInUser, signOutUser, updateUserProfile, loading };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node,
}