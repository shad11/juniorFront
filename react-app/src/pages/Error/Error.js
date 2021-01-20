import React from "react";
import PropTypes from "prop-types";

const Error = ({ message }) => (
    <div>
        <h2>An error has occurred</h2>
        <h3>Error details: {message} </h3>
        <button>Go home</button>
    </div>
);

Error.propTypes = {
    message: PropTypes.string
};

Error.defaultProps = {
    message: 'Error occurred'
};

export default Error;