import React from "react";

export const required = value =>
    (value || typeof value === 'number' ? undefined : 'Required');

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

export  const maxLength15 = maxLength(15)



const fileMinSize = 1 * 1000;//1KB
const fileMaxSize =  2 * 1000 * 1000; // 2MB

export const validate =values =>{
    let errors = null;
    // console.log(values);
    if (!values) {
        errors = 'Required';
    } else {
debugger
        values.map(file =>{
        if (!file.name.endsWith('.png') && !file.name.endsWith('.jpg') && !file.name.endsWith('.svg') && !file.name.endsWith('.gif')&& !file.name.endsWith('.zip')) {
            errors = 'Wrong file format';
        }else if (file.size < fileMinSize) {
            errors = 'Scan file must be at least 1KB';
        } else if (file.size > fileMaxSize) {
            errors = 'File cannot exceed 2MB size';
        }
        })
    }

    // console.log(errors);
    // Object {file: "Required"}

    return errors;
}

