import React, { useEffect } from "react";
import { useField } from "formik";

const Radio = ({label, className='', name, options, ...props}) => {
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

export default Radio;