import React from "react";

export const required = value =>
    (value || typeof value === 'number' ? undefined : 'Required field !');

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

export const maxLength30 = maxLength(30)


const fileMinSize = 1 * 1000;//1KB
const fileMaxSize = 20 * 1000 * 1000; // 2MB

export const validate = values => {
    let errors = null;
    if (!values || values.length === 0) {
        errors = 'Please select a file before uploading!';
    } else {

        values.map(file => {
            if (!file.name.endsWith('.png') && !file.name.endsWith('.pdf') && !file.name.endsWith('.zip')) {
                errors = 'Wrong file format';
            } else if (file.size < fileMinSize) {
                errors = 'Scan file must be at least 1KB';
            } else if (file.size > fileMaxSize) {
                errors = 'File cannot exceed 20MB size';
            }
        })
    }
    return errors;
}

