import React, {memo} from "react";
import { LoginForm } from "../../components/Forms";

const Login = () => (
    <div className='row'>
        <div className="card blue-grey darken-1">
            <div className="card-content white-text">
                <span className="card-title center-align">Login</span>
                <div>
                    <LoginForm />
                </div>
            </div>
        </div>
    </div>
);

export default memo(Login);