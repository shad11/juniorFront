import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";

export const TextInput = ({label, className, ...props}) => {
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

TextInput.propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
};

TextInput.defaultProps = {
    className: 'input-field',
};

export default TextInput;