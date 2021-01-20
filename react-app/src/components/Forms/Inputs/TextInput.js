import React from "react";
import { useField } from "formik";

export const TextInput = ({label, className='text-input', ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className={className}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...field} {...props} />
            { meta.touched && meta.error
                ? <div className="error-input">{meta.error}</div>
                : null
            }
        </div>
    )
};