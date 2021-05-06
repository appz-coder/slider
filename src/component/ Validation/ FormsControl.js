import React from "react";
import "./FormsControl.css"

export const Input =  ({input,  meta: { touched, error, warning }, ...props})=>{
    return(
        <div >
            <label htmlFor="fname" style={{color: "#949db0"}}>Title</label>
            <input {...input} {...props}  className={touched && error ?"title input_title": "input_title"}
                   type="text"
                   placeholder={"Presentation 1"}/>

                {touched && error &&  <div className={"div_warning"} >
                    <i className="fas mr-2 fa-exclamation-circle"></i>
                    {error}</div>}

        </div>
    );
}

const adaptFileEventToValue = delegate => e => delegate(Object.values(e.target.files));
export const InputFile = ({
                              input: { value: omitValue, onChange, onBlur, ...inputProps },
                              meta: { touched, error, warning },

                              ...props
                          }) => {
    return (
        <div>
            <label className="custom-file-upload">
            <input
                onChange={adaptFileEventToValue(onChange)}
                onBlur={adaptFileEventToValue(onBlur)}
                type="file"
                {...props.input}
                {...props}
            />
                <img className={"mt-5"}
                     src={"https://img2.pngio.com/upload-icons-free-download-png-and-svg-upload-icon-png-256_256.png"}
                     width={"100px"}/>
                Upload Presentation
                <small className={"mt-5 mb-5"}>PNG, JPG, SVG, GIF max file size 2 Mb.<br/>
                    White or transparent background.</small>
            </label>


            {touched && error &&  <div style={{background:"#ef5d7d", marginTop:"2%", borderRadius:"5px", color:"white", padding:"3%"}} >
                 <i className="fas mr-2 fa-exclamation-circle"></i>
                {error}</div>}

        </div>

    );
};
