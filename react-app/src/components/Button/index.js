import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ text, className, onClick, ...rest}) => (
    <button className={className} onClick={onClick} {...rest}>{text}</button>
    // <button className={className} onClick={onClick} {...rest}>{children}</button>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    className: null,
    onClick: () => {}
};

export default Button;