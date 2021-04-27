import React from "react";
import "./Home.css"
import Twitter from "../../icon/twitter.png"
import Hand from "../../icon/Hands.webp"

const Home = () => {
    return (<div className="page">
        <div className="container center_div">
            <div className="row justify-content-center">
                <div className="form-group col-md-5 col-md-offset-5 align-center ">
                    <div className="home">
                        <div>
                            <img src={Hand}/>
                            <h1>Slider Club</h1>

                        </div>
                        <p>
                            Sign up to share your presenntation on Slider App.<br/>
                            We can't wait for you to join!
                        </p>
                    </div>
                    <div className="button-twitt">
                        <a href="/about" className="btn btn-lg  btn-block" role="button">
                            Sign in with Twitter
                            <img src={Twitter} className="twitt-log"/>
                        </a>
                        <small>Preview existing presentation? Click here to enter code</small>
                    </div>
                    <p className="mt-5 mb-3 text-muted text-center">Privacy | Terms of Use</p>
                </div>
            </div>
        </div>
    </div>)
}

export default Home;