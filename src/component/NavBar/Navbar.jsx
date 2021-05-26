import React from "react";
import Hands from "../../icon/Hands.webp"
import "./Navbar.css"

import {Image,  Navbar, NavDropdown} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {logoutUserData} from "../../redux/store/reducer/auth_reducer";


const Header = () => {
    const dispatch = useDispatch();
    const {imageUrl, givenName} = useSelector((state) => state.auth)
    return (
        <Navbar className="header" expand="lg">
            <Navbar.Brand href="/home">
                <img src={Hands} className="nav_img" alt=""/>
                Slider Club
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse className={"col_div"} id="basic-navbar-nav">
                <div className="top_div">
                        <Image roundedCircle className={"mx_auto"} src={imageUrl} />
                        <hr />
                    <NavDropdown className={"nav-drop  nav-link"} title={`Hello ${givenName}`} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => {
                            dispatch(logoutUserData())
                        }}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </div>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default Header;