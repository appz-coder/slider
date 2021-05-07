import React from "react";
import "./FormsControl.css"
import {ProgressBar} from "react-bootstrap";

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

    const [progress, setProgress] = React.useState(100)
    const loader = () =>{
        if(progress===100){
            setProgress("0")
            setTimeout(()=>setProgress(100),2000)
        }
    }
    return (

        <div>
            <label className="custom-file-upload">

                <img className={"mt-5"}
                     src={"https://img2.pngio.com/upload-icons-free-download-png-and-svg-upload-icon-png-256_256.png"}
                     width={"100px"}/>
                Upload Presentation
                <small className={"mt-5 mb-5"}>PNG, JPG, SVG, GIF max file size 2 Mb.<br/>
                    White or transparent background.</small>
                <input
                    onChange={adaptFileEventToValue(onChange)}
                    onBlur={adaptFileEventToValue(onBlur)}
                    onClick={loader}
                    type="file"
                    {...props.input}
                    {...props}
                />

            </label>

            {!error && progress && (<div className={"div_success"} >
                    <p className={"m-0"}>{omitValue ? omitValue.length : ''} files uploaded successfully</p>
                    <ProgressBar now={progress} label={`${progress}%`}/>
                </div>
            )}

            {touched && error && <div className={"div_warning_file"}>
                <i className="fas mr-2 fa-exclamation-circle"></i>
                {error}</div>}


        </div>

    );
};
