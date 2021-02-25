import React from "react";
import { RegisterForm } from "../../components/Forms";

const Register = () => (
    <div className='row'>
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <span className="card-title center-align">Register</span>
                <div>
                    <RegisterForm />
                </div>
            </div>
        </div>
    </div>
);

export default Register;