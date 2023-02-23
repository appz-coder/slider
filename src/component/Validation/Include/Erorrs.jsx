import React from "react"
import "./incstyles.css"
import {Spinner} from "react-bootstrap";



const Errors = (props) =>{
    return (
        <div className={"error_load"}>
            <p>{props.error}</p>
            <Spinner  animation="grow" variant="primary"/>
        </div>

    )
}
export default Errors;