import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserData } from '../../redux/actions/authActions';
import jwtDecode from 'jwt-decode';
import './GoogleLoginButton.css'; // Import CSS file for styling

const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    const handleCredentialResponse = (response) => {
        // Decode the response.credential here and dispatch loginUserData action
        const userObject = jwtDecode(response.credential);
        dispatch(loginUserData({ profileObj: userObject }));
    };

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                window.google.accounts.id.initialize({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                });
                window.google.accounts.id.renderButton(
                    document.getElementById('googleSignInButton'),
                    { theme: 'outline', size: 'large', text: 'signin_with', shape: 'rectangular', width: '300', locale: 'en' }
                );
            } else {
                console.error('Google Sign-In API not initialized.');
            }
        };

        initializeGoogleSignIn();
    }, [dispatch]);

    return <div id="googleSignInButton" className="centered-button"></div>;
};

export default GoogleLoginButton;
