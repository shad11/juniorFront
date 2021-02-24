import React, { memo } from "react";
import { useField } from "formik";

export const TextInput = ({label, className='input-field', ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className={className}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...field} {...props} />

            { meta.touched && meta.error
                ? <div className="helper-text deep-orange-text" data-error='wrong'>{meta.error}</div>
                : null
            }
        </div>
    )
};

export default memo(TextInput);