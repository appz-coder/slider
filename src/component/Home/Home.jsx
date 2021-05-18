import React from "react";
import "./Home.css"
import Twitter from "../../icon/twitter.png"
import Hand from "../../icon/Hands.webp";
import GoogleButton from 'react-google-button';
import {Button, Card, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

const Home = () => {
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
                {/*href={`${process.env.REACT_APP_API_URL}api/auth/google`}*/}
                <Link to="/about" style={{textDecoration:'none'}}>
                <GoogleButton className={'button_google'}
                              // onClick={() => { alert('Google button clicked') }}
                />
                </Link>
                <Card.Text style={{fontSize:'16px'}}>Preview existing presentation? Click here to enter code</Card.Text>
            </Card.Body>
                <Card.Text className={"hom_foot"}>Privacy | Terms of Use</Card.Text>
        </Card>

        </div>)
}

export default Home;