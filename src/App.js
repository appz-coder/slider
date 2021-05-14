import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./component/Home/Home";
import {Route, withRouter} from "react-router-dom";
import About from "./component/About/About";
import Header from "./component/NavBar/Navbar";
import Slider from "./component/Carousel/carousel";
import Login from "./component/Login/Login";



function App(props) {
    return (
        <div>
            {
                props.location.pathname==="/" ? <Home/>:""
            }
            {
                props.location.pathname!=="/" && props.location.pathname!=="/slider" && props.location.pathname!=="/login"?  <Header/>:""
            }

            <Route path={'/about/:Id?'}  render={() =><About/>}/>
            <Route path={'/slider/:Id?'}  render={() =><Slider/>}/>
            <Route path={'/login'}  render={() =><Login/>}/>
        </div>
    );
}

export default  withRouter(App);
