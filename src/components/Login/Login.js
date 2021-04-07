import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import Button from '@material-ui/core/Button';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/"}};

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    } 

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const {displayName, email} = result.user;
                const signedInUser = {name: displayName, email: email};
                setLoggedInUser(signedInUser);
                history.replace(from);

            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
            });
    }

    return (
        <div>
            <h5>Email : {loggedInUser.email}</h5>
            <h1>Please Login with Gmail</h1>
            <Button onClick={handleGoogleSignIn} variant="contained" color="primary">
                Sign in With Google
            </Button>            
        </div>
    );
};

export default Login;