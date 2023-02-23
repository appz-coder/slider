import React from "react";
import "./FormsControl.css"
import {useSelector} from "react-redux";


export const Input = ({input, meta: {touched, error, warning}, ...props}) => {
    return (
        <div>
            <label htmlFor="fname" style={{color: "#4a4f5a", fontSize: '12px'}}>Title</label>
            <input {...input} {...props} className={touched && error ? "title input_title" : "input_title"}
                   type="text"
                   placeholder={"presentation title"}/>

            {touched && error && <div className={"div_warning"}>
                <i className="fas mr-2 fa-exclamation-circle"></i>
                {error}</div>}

        </div>
    );
}
const adaptFileEventToValue = delegate => e => delegate(Object.values(e.target.files));
export const InputFile = ({
                              input: {value: omitValue, onChange, onBlur, ...inputProps},
                              meta: {touched, error},

                              ...props
                          }) => {
    const {errors, messages} = useSelector((state) => state.newPresentation)
    return (

        <div>
            <label className="custom-file-upload">
                <i className="fas upload_icon_form  fa-file-upload"></i>
                Upload Presentation
                <small className={"mt-3 mb-3"}>PNG, PDF, ZIP max file size 20 Mb.<br/>
                    White or transparent background.</small>
                <input
                    onChange={adaptFileEventToValue(onChange)}
                    onBlur={adaptFileEventToValue(onBlur)}
                    type="file"
                    {...props.input}
                    {...props}
                />

            </label>

            {!error && (<div className={errors ? "div_warning_file" : "div_success"}>
                    {messages ? <p className={"m-0"}>
                            {errors ? <i className="fas mr-2 fa-exclamation-circle"></i>
                                : <i className="fas mr-2 fa-check-circle"></i>}
                            {messages}</p> :
                        <p className={"m-0"}>
                            <i className="fas  mr-2 fa-check"></i>
                            {omitValue ? omitValue.length : ''} files selected
                        </p>
                    }

                </div>
            )}

            {touched && error && <div className={"div_warning_file"}>
                <i className="fas mr-2 fa-exclamation-circle"></i>
                {error}</div>}


        </div>

    );
};
export const InputName = ({input, meta: {touched, error, warning}, ...props}) => {
    return (
        <div>
            <input {...input} {...props}
                   type="text"/>

            {touched && error && <div style={{color: 'red', marginTop: '-5%', fontSize: '12px'}}>
                <i className="fas mr-2 fa-exclamation-circle"></i>
                {error}</div>}

        </div>
    );
}