import React from "react";
import PropTypes from "prop-types";
import * as Icons from "../../theme/icons";

const Icon = (props) => {
    const { type, color, filled, onClick } = props;

    const iconJsx = Icons[type];

    if (!iconJsx) {
        return null;
    }

    return (
        <div onClick={onClick}>
            {iconJsx(color, filled)}
        </div>
    );
};

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string,
    filled: PropTypes.bool,
    onClick: PropTypes.func
};

Icon.defaultProps = {
    color: '#000',
    filled: true,
    onClick: () => {}
};

export default Icon;