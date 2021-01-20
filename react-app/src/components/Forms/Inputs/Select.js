import React from "react";
import { useField } from "formik";

export const Select = ({label, className='select', ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className={className}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error
                ? <div className="error-input">{meta.error}</div>
                : null
            }
        </div>
    )
};