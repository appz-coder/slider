import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./component/Home/Home";
import {Route, withRouter} from "react-router-dom";
import About from "./component/About/About";
import Header from "./component/NavBar/Navbar";



function App(props) {
    return (
        <div>


            <Route  path={'/home'}  render={() => <Home/>}/>

        </div>
    );
}

export default  withRouter(App);
