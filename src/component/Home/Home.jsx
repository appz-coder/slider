import React, { useState, useEffect } from "react";
import "./Home.css";
import Hand from "../../icon/Hands.webp";
import { Card, Image } from "react-bootstrap";
import GoogleLogin from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserData, setUsersData, logoutUserData } from "../../redux/store/reducer/auth_reducer";
import { Redirect } from "react-router-dom";

const Home = () => {
    const [privateShow, setPrivateShow] = useState(false);
    const { isAuth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUserData()); // Ensure user is logged out on component mount
    }, [dispatch]);

    const responseGoogle = (response) => {
        const profileObj = response.profileObj || {};
        dispatch(loginUserData({ profileObj }));

        let { email, familyName, givenName, googleId, imageUrl, name } = profileObj;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('familyName', familyName);
        formData.append('givenName', givenName);
        formData.append('googleId', googleId);
        formData.append('imageUrl', imageUrl);
        formData.append('name', name);
        dispatch(setUsersData(formData));
    };

    if (isAuth) return <Redirect to={'/home'} />;
    return (
        <div className={"hom_card"}>
            <Card className="text-center border-0 hom_card ">
                <Card.Body>
                    <Card.Title style={{ fontSize: "40px", paddingTop: "12%", fontWeight: '700' }}>
                        <Image style={{ width: "55px", marginRight: "2%" }} src={Hand} />
                        Slider Club
                    </Card.Title>
                    <Card.Text className={"h6 mt-4 mb-4"} style={{ fontSize: "22px", color: "#4a4a4a" }}>
                        Sign up to share your presentation on Slider App.<br />
                        We can't wait for you to join!
                    </Card.Text>
                    <GoogleLogin
                        className={"button_google"}
                        clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                        buttonText="Sign in with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Card.Text style={{ fontSize: '16px' }}>
                        Preview existing presentation? <button className={"nav-item a_hov"} onClick={() => setPrivateShow(true)}>Click here to enter code</button>
                    </Card.Text>
                </Card.Body>
                <Card.Text className={"hom_foot"}>Privacy | Terms of Use</Card.Text>
            </Card>
            {/* Render Private component based on privateShow state */}
        </div>
    );
};

export default Home;
