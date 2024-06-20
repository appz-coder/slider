import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { loginUserData } from '../../redux/store/reducer/auth_reducer';

const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (window.google && window.google.accounts && window.google.accounts.id) {
                window.google.accounts.id.initialize({
                    client_id: '876278877745-ulqtn1eqh3lt3l2faqpg6p17p76qpme1.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('googleSignInButton'),
                    { theme: 'outline', size: 'large' }
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

    return <div id="googleSignInButton"></div>;
};

export default GoogleLoginButton;
