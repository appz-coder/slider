import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./component/Home/Home";
import {Route, withRouter} from "react-router-dom";
import About from "./component/About/About";
import Slider from "./component/Carousel/carousel";



function App(props) {
    return (
        <div>
            {
                props.location.pathname==="/" ? <Home/>:""
            }
            <Route path={'/home/:Id?'}  render={() =><About/>}/>
            <Route path={'/w/:secret_key?'}  render={() =><Slider/>}/>
        </div>
    );
}

export default  withRouter(App);
