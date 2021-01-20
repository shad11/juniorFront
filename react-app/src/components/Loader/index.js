import React from "react";
import "./Loader.scss";

const Loader = () => (
    <div className="gooey">
        <span className="dot"></span>
        <div className="dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
);

export default Loader;