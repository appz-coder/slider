import React from "react";
import "./CreatePresentation.css"
import {Button, Modal} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {Input, InputFile, InputFile1} from "../../ Validation/ FormsControl";
import { maxLength30, required, validate} from "../../ Validation/ValidationForm";

const PresentationForm =(props)=>{
    return(
        <form  className="form-signin" onSubmit={props.handleSubmit} encType="multipart/form-data">
            <Field
                name="title"
                component={Input}
                validate={[required,maxLength30]}
            />
            <div className="custom-control  mt-4 mb-4 form-control-lg custom-checkbox">
                <Field component="input"
                       type="checkbox"
                       name="private"
                       className="custom-control-input"
                       id="customCheck1"/>
                <label className="custom-control-label" htmlFor="customCheck1">mark it as private</label>
            </div>
            <Field
                component={InputFile}
                validate={validate}
                multiple
                name="file"
                type='file'

            />

            <Button onClick={props.onHide} type="submit" className="btn popBtn">
                Create
                <i className="fas ml-2 fa-arrow-right"></i>
                {/*<img  style={{width:"25px", color:"white"}} src={out}/>*/}
            </Button>

        </form>
    )
}
const ReduxPresentationForm = reduxForm({form: 'popup'})(PresentationForm)

const CreatePresentation = (props) => {
    const onSubmit =(data)=>{
        console.log(data);
    }
    return (
        <Modal
            size="lg"
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body className={"w-50"}>
                <Modal.Title id="contained-modal-title-vcenter" className={"pop_title  h4 "}>
                    Create    Presentation
                </Modal.Title>
                <ReduxPresentationForm onSubmit={onSubmit}/>
            </Modal.Body>

        </Modal>

    )
}

export default CreatePresentation;