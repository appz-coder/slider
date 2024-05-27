import React from "react";
import "./Home.css";
import Hand from "../../icon/Hands.webp";
import { Card, Image } from "react-bootstrap";
import Private from "./PrivateKey/Private";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import GoogleLoginButton from "././GoogleLoginButton/GoogleLoginButton"; // Assuming this is the correct path

const Home = () => {
    const [privateShow, setPrivateShow] = React.useState(false);
    const { isAuth } = useSelector((state) => state.auth);

    if (isAuth) return <Redirect to={"/home"} />;

    return (
        <div className={"hom_card"}>
            <Card className="text-center border-0 hom_card ">
                <Card.Body>
                    <Card.Title style={{ fontSize: "40px", paddingTop: "12%", fontWeight: "700" }}>
                        <Image style={{ width: "55px", marginRight: "2%" }} src={Hand} />
                        Slider Club
                    </Card.Title>
                    <Card.Text className={"h6 mt-4 mb-4"} style={{ fontSize: "22px", color: "#4a4a4a" }}>
                        Sign up to share your presentation on Slider App.<br />
                        We can't wait for you to join!
                    </Card.Text>
                    <GoogleLoginButton /> {/* Render the new GoogleLoginButton component */}
                    <Card.Text style={{ fontSize: "16px" }}>
                        Preview existing presentation?{" "}
                        <a className={"nav-item a_hov"} onClick={() => setPrivateShow(true)}>
                            Click here to enter code
                        </a>
                    </Card.Text>
                </Card.Body>
                <Card.Text className={"hom_foot"}>Privacy | Terms of Use</Card.Text>
            </Card>
            <Private show={privateShow} onHide={() => setPrivateShow(false)} />
        </div>
    );
};

export default Home;
