import React, { useEffect } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import ReactCodeInput from "react-code-input";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import hands from "../../../icon/Hands.webp";
import "./Private.css";
import { fetchPublicPresentation } from "../../../redux/store/action_creator/publicSliderAC";

const styles = {
    className: "input_style",
    inputStyle: {
        MozAppearance: 'textfield',
        width: '40px',
        fontSize: '25px',
        height: '50px',
        color: 'black',
        border: '1px solid #e0e1e4',
        textAlign: 'center',
        outlineColor: '#c0d9ee',
    },
    inputStyleInvalid: {
        MozAppearance: 'textfield',
        textAlign: 'center',
        width: '40px',
        fontSize: '25px',
        height: '50px',
        color: '#785c5c',
        border: '1px solid #eb3d3d',
        outlineColor: '#e96161',
        outlineWidth: 'medium!important'
    }
};

const Private = (props) => {
    let { error, isPublic } = useSelector((state) => state.showPresentation);
    let history = useHistory();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState();
    const notify = () => toast.error("Presentation does not exist ");

    useEffect(() => {
        if (error) {
            notify();
        } else if (isPublic) {
            history.push(`/w/${value}`);
        }
    }, [error, isPublic, history, value]);

    const sendValue = async () => {
        await dispatch(fetchPublicPresentation(value));
    };

    return (
        <div>
            <Modal className={"private_pop"}
                   {...props}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <ToastContainer position="top-right"
                                autoClose={2000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
                <Modal.Header className={"private_header border-0"} closeButton> </Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <Image width={"35px"} src={hands}/>
                    <strong className={"ml-3 "}> Slider Club</strong>
                </Modal.Title>
                <Modal.Body className={"private_body"}>
                    <h6>Enter the 6 digits code to unlock presentation</h6>
                    <ReactCodeInput onChange={val => setValue(val)} isValid={true} fields={6} name={"private"} type="text" {...styles}/>
                    <Button className={"private_button"} onClick={sendValue} size="lg" block>Continue</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Private;
