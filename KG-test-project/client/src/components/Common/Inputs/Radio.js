import React, { useEffect } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";

const Radio = ({className, name, options, ...props}) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;
    const { value: initVal} = field;

    useEffect(() => {
        const firstElem = document.querySelectorAll(`input[${ !initVal ? `name='${name}'` : `value='${initVal}'`}]`)[0];

        firstElem.checked = true;
        setValue(firstElem.value);
    }, [initVal]);

    return (
        <div className={className}>
            {options.map(elem => (
                <label key={elem.value}>
                    <input name={name} type="radio" value={elem.value} {...props} onChange={() => setValue(elem.value)}/>
                    <span>{elem.name}</span>
                </label>
            ))}
        </div>
    )
};

Radio.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array.isRequired
};

Radio.defaultProps = {
    options: []
};

export default Radio;