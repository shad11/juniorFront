import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { staffSelectors, staffOperations } from "../../store/staff";
import EmployeeRow from "./EmployeeRow";

const StaffList = () => {
    const isLoading = useSelector(staffSelectors.isLoading);
    const data = useSelector(staffSelectors.getStaff);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!data.length) {
            dispatch(staffOperations.loadStaff());
        }
    }, []);


    return (<>
        {isLoading && <div>Loading...</div>}

        {!isLoading &&
        <>
            <table className='highlight'>
                <thead>
                <tr>
                    <th>Full name</th>
                    <th>Sex</th>
                    <th>Phone</th>
                    <th>Adding date</th>
                    <th>Salary</th>
                    <th>Position</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                    {data.map(elem => (
                        <EmployeeRow key={elem._id} elem={elem} />
                    ))}
                </tbody>
            </table>
        </>}
    </>)
};

export default StaffList;