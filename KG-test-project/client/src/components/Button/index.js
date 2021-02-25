import React from "react";
import PropTypes from "prop-types";
import './Button.scss';

const Button = ({ children, className, onClick, ...rest}) => (
    <button className={className} onClick={onClick} {...rest}>
        {children}
    </button>
);

Button.protoTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.object
    ]),
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
    onClick: () => {}
};

export default Button;