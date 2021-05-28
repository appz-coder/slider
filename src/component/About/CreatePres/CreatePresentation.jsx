import React from "react";
import "./CreatePresentation.css"
import {Button, Modal, Spinner} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {Input, InputFile} from "../../ Validation/ FormsControl";
import {maxLength30, required, validate} from "../../ Validation/ValidationForm";
import {useSelector, useDispatch} from 'react-redux'
import {presentationCreated, returnPresentationStateAC} from "../../../redux/store/action_creator/createPresentationAC";

const PresentationForm = (props) => {
    const {loading, isProcessed} = useSelector((state) => state.newPresentation);
    const dispatch = useDispatch();
    const stateReturn = async () => {
        await dispatch(returnPresentationStateAC())
        props.onHide()
    }
    return (<div>
            <form className="form-signin" style={{width:'130%',marginLeft:'-13%'}} onSubmit={props.handleSubmit} encType="multipart/form-data">
                <Field
                    name="title"
                    component={Input}
                    validate={[required, maxLength30]}
                />
                <div className="custom-control  mt-3 form-control-lg custom-checkbox">
                    <Field component="input"
                           type="checkbox"
                           name="is_private"
                           className="custom-control-input "
                           id="customCheck1"/>
                    <label className="custom-control-label" htmlFor="customCheck1">mark it as private</label>
                </div>
                <Field
                    component={InputFile}
                    validate={validate}
                    multiple
                    name="slider"
                    type='file'
                    progress={props.progress}

                />
                {isProcessed ? <div>
                        <button onClick={stateReturn} type="button" className="btn btn-primary popBtn">
                            Close
                            <i className="fas ml-3 fa-times-circle"></i>
                        </button>
                    </div> :
                    (<div>
                        {loading ?  <Button className={"popBtn"} variant="primary" disabled>
                                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                                Loading...
                            </Button>:
                            <div>

                            <Button type="submit" className="btn popBtn">
                                Create
                                <i className="fas ml-2 fa-arrow-right"></i>
                            </Button>
                            </div>
                        }
                    </div>)
                }
            </form>

        </div>
    )
}
const ReduxPresentationForm = reduxForm({form: 'popup'})(PresentationForm)

const CreatePresentation = (props) => {
    const [progress, setProgress] = React.useState()
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        let {title, slider, is_private} = data;
        if (!is_private) {
            is_private = false;
        }
        const formData = new FormData;
        formData.append('title', title)
        formData.append('is_private', is_private)
        for (let i = 0; i < slider.length; i++) {
            formData.append('slider', slider[i])
        }
        dispatch(presentationCreated(formData));
    }
    return (
        <Modal

            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body className={"w-50"}>
                <Modal.Title id="contained-modal-title-vcenter" className={"pop_title  h4 "}>
                    Create Presentation
                </Modal.Title>
                <ReduxPresentationForm onSubmit={onSubmit} progress={progress} onHide={props.onHide}/>
            </Modal.Body>

        </Modal>

    )
}

export default CreatePresentation;