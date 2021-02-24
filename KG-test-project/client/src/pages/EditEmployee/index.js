import React, {memo} from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { EmployeeForm } from "../../components/Forms";
import "./EditEmployee.scss";

const EditEmployee = () => {
    const location = useLocation();

    return (
        <div>
            <Header isMain={false}/>
            {location.pathname === '/create' &&
            <>
                <h4>Add a new employee</h4>
            </>}

            {location.pathname !== '/create' &&
            <>
                <h3>Edit employee data</h3>
            </>}

            <div className='row'>
                <div className='col s6'>
                    <EmployeeForm />
                </div>
            </div>
        </div>
    );
};

export default memo(EditEmployee);