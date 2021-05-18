import React from "react";
import Hands from "../../icon/Hands.webp"
import "./Navbar.css"
import {NavLink} from "react-router-dom";
import {Button, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import {logoutUserData} from "../../redux/store/reducer/auth_reducer";



const Header = () => {
    const dispatch = useDispatch();
    const {isAuth,username} = useSelector((state) => state.auth)
    return (
        <Navbar className="header"  expand="lg">
            <Navbar.Brand href="#home">
                <img src={Hands} className="nav_img" alt=""/>
                Slider Club
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className={"col_div"} id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to={"/about"} className="nav-link">About</NavLink>
                    <NavLink to={"/w/"} className="nav-link">Slider</NavLink>

                </Nav>
                <Image roundedCircle width={"50"}  src={"https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/user_edit.png"}/>
                <NavDropdown  className={"nav-drop nav-link"} title={`Hello ${username}`} id="basic-nav-dropdown">
                    <NavDropdown.Item  onClick={()=>{dispatch(logoutUserData())}}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default Header;