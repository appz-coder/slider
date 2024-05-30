// src/components/GoogleLoginButton/GoogleLoginButton.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { loginUserData } from '../../redux/store/reducer/auth_reducer';

const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            window.google.accounts.id.initialize({
                client_id: 'REACT_APP_CLIENT_ID',
                callback: handleCredentialResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById('googleSignInButton'),
                { theme: 'outline', size: 'large' }
            );
        };

        const handleCredentialResponse = (response) => {
            const userObject = jwt_decode(response.credential);
            dispatch(loginUserData({ profileObj: userObject }));
        };

        initializeGoogleSignIn();
    }, [dispatch]);

    return <div id="googleSignInButton"></div>;
};

export default GoogleLoginButton;
