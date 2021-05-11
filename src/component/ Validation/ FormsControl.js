import React from "react";
import "./FormsControl.css"
import {useSelector} from "react-redux";


export const Input = ({input, meta: {touched, error, warning}, ...props}) => {
    return (
        <div>
            <label htmlFor="fname" style={{color: "#949db0"}}>Title</label>
            <input {...input} {...props} className={touched && error ? "title input_title" : "input_title"}
                   type="text"
                   placeholder={"Presentation 1"}/>

            {touched && error && <div className={"div_warning"}>
                <i className="fas mr-2 fa-exclamation-circle"></i>
                {error}</div>}

        </div>
    );
}
const adaptFileEventToValue = delegate => e => delegate(Object.values(e.target.files));
export const InputFile = ({
                              input: {value: omitValue, onChange, onBlur, ...inputProps},
                              meta: {touched, error, warning},

                              ...props
                          }) => {
    const {loading, errors, messages} = useSelector((state) => state.newPresentation)
    return (

        <div>
            <label className="custom-file-upload">
                <i className="fas upload_icon_form  fa-file-upload"></i>
                Upload Presentation
                <small className={"mt-5 mb-5"}>PNG, JPG, SVG, GIF max file size 2 Mb.<br/>
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
