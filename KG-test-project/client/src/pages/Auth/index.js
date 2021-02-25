import React from "react";
import { Link } from "react-router-dom";

const Auth = () => (
    <>
        <div className='valign-wrapper'>
            <div className='row'>
                <div className='col s6 right-align'>
                    <Link to='/register' className='waves-effect waves-light blue btn'>
                        Register
                    </Link>
                </div>
                <div className='col s6'>
                    <Link to='/login' className='waves-effect waves-light btn'>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    </>
);

export default Auth;