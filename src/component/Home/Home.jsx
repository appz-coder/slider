import React from "react";
import "./Home.css"
import Hand from "../../icon/Hands.webp";
import {Button, Card, Container, Image} from "react-bootstrap";
import Private from "./PrivateKey/Private";
import GoogleLogin from 'react-google-login';
import {useSelector, useDispatch} from 'react-redux'
import {loginUserData, setUsersData} from "../../redux/store/reducer/auth_reducer";
import {presentationApi} from "../api/api";
import {Redirect} from "react-router-dom";



const Home = () => {
    const [privateShow, setPrivateShow] = React.useState(false);
    const {isAuth} = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const responseGoogle =  (response) => {
        console.log(response)
         dispatch(loginUserData(response));
        let {email, familyName, givenName, googleId, imageUrl, name} = response.profileObj
        const formData = new FormData;
        formData.append('email', email);
        formData.append('familyName', familyName);
        formData.append('givenName', givenName);
        formData.append('googleId', googleId);
        formData.append('imageUrl', imageUrl);
        formData.append('name', name);
        dispatch(setUsersData(formData))
    }
     if(isAuth) return <Redirect to={'/home'}/>
    return (
        <div className={"hom_card"}>
            <Card className="text-center border-0 hom_card ">

            <Card.Body  >
                <Card.Title style={{fontSize: "40px" ,paddingTop:"12%" ,fontWeight:'700'}}>
                    <Image style={{ width:"55px",marginRight:"2%"}} src={Hand}/>
                    Slider Club
                </Card.Title>
                <Card.Text className={"h6 mt-4 mb-4"} style={{ fontSize:"22px",color:" #4a4a4a"}}>
                    Sign up to share your presenntation on Slider App.<br/>
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
                <Card.Text style={{fontSize:'16px'}}>Preview existing presentation? <a style={{color:'#212529'}} className={"nav-item a_hov"} onClick={()=>setPrivateShow(true)}>Click here to enter code</a></Card.Text>
            </Card.Body>
                <Card.Text className={"hom_foot"}>Privacy | Terms of Use</Card.Text>
        </Card>
            <Private  show={privateShow}
                      onHide={() => setPrivateShow(false)}/>
        </div>)
}

export default Home;