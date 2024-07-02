import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { loginUserData } from '../../redux/store/reducer/auth_reducer';
import '../../GoogleLoginButton.css'; // Import CSS for styling

const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                window.google.accounts.id.initialize({
                    client_id: '468634370912-0oh2k0gjc50cokd54hrp6tncq9qelh5j.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('googleSignInButton'),
                    { theme: 'outline', size: 'large', text: 'signin_with', shape: 'rectangular', width: 300 }
                );
            } else {
                console.error('Google API not loaded properly');
            }
        };

        const handleCredentialResponse = (response) => {
            try {
                const userObject = jwt_decode(response.credential);
                dispatch(loginUserData({ profileObj: userObject }));
            } catch (error) {
                console.error('Error decoding token', error);
            }
        };

        const interval = setInterval(() => {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                initializeGoogleSignIn();
                clearInterval(interval);
            } else {
                console.log('Waiting for Google API to load');
            }
        }, 100);

        return () => clearInterval(interval);
    }, [dispatch]);

    return <div id="googleSignInButton" className="centered-button"></div>;
};

export default GoogleLoginButton;
