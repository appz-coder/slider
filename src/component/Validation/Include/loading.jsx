import React from 'react'
import './incstyles.css'
import {Spinner} from "react-bootstrap";


const Load = () =>{
    return (
        <div className={"error_load"}>
            <p>please wait...</p>
            <Spinner  animation="grow" variant="primary"/>
        </div>

    )
}
export default Load