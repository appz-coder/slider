import React from "react";
import "./SharePresentation.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Button, Modal} from "react-bootstrap";


const SharePresentation = (props) => {
    const [copyVal = {
        value: `${process.env.REACT_APP_API_URL}${props.path}`,
        copied: false,
    },setCopyVal] = React.useState()

    const setTimer=()=>{
       setCopyVal({copied: true});
        setTimeout(() => {
            setCopyVal({ copied: false,value:copyVal.value });
        }, 1000);
    }

    return (
        <Modal
            {...props}

            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" className={"share_title"}>
                    Share your Presentation
                    <p>Your Key for presentation</p>
                    <small>344 - 344</small>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width:"90%"}}>
                <div className={"d-flex justify-content-between input-group"}>
                    <div className={"get_link"}>
                        <Button className={"div_butt"}>
                            <i className="fas fa-link"></i>
                        </Button>
                        <h6>Get link</h6>
                    </div>
                    <Button variant="link">
                        <i className="fas fa-cog text-secondary h5"></i>
                    </Button>
                </div>

                <div className="input-group">
                    <input type="text" className={copyVal.copied ?"form-control link_input_copy":"form-control link_input"}disabled
                           value={copyVal.value}
                           onChange={({target: {value}}) => setCopyVal({value, copied: false})}/>
                    <CopyToClipboard text={copyVal.value}
                                     onCopy={setTimer}>
                        <button className={"link_button"}>Copy link</button>
                    </CopyToClipboard>
                </div>

                {copyVal.copied ? <div className={"copy_div far fa-copy"} >copied.</div> : null}

            </Modal.Body>
            <Modal.Footer className={"border-0"}>
                <Button  className={"clos_btn"} onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SharePresentation;