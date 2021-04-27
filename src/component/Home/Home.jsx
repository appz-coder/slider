import React from "react";
import "./Home.css"
import Twitter from "../../icon/twitter.png"
import Hand from "../../icon/Hands.webp"
import {Button, Card, Image} from "react-bootstrap";

const Home = () => {
    return (<Card className="text-center hom_card">

            <Card.Body  >
                <Card.Title style={{fontSize: "45px" ,paddingTop:"10%"}}>
                    <Image style={{ width:"60px",marginRight:"2%"}} src={Hand}/>
                    Slider Club
                </Card.Title>
                <Card.Text style={{margin:"3%", fontSize:"22px",color:" #4a4a4a"}}>
                    Sign up to share your presenntation on Slider App.<br/>
                    We can't wait for you to join!
                </Card.Text>
                <Button className={"button-twitt"}>
                    <span>Sign in with Twitter</span>
                    <Image className={"twitt-log"} src={Twitter} />
                </Button>
                <Card.Text>Preview existing presentation? Click here to enter code</Card.Text>
                <Card.Text className={"hom_foot"}>Privacy | Terms of Use</Card.Text>
            </Card.Body>
        </Card>)
}

export default Home;