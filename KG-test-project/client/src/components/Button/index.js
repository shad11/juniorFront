import React, { memo } from "react";
import './Button.scss';

const Button = ({ children, className, onClick, ...rest}) => (
    <button className={className} onClick={onClick} {...rest}>
        {children}
    </button>
);

export default memo(Button);