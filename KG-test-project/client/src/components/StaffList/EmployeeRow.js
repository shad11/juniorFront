import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useMessage } from "../../hooks/message.hook";
import { staffActions, staffOperations } from "../../store/staff";
import Button from "../Button";
import 'react-confirm-alert/src/react-confirm-alert.css';

const EmployeeRow = ({ elem }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const message = useMessage();

    const edit = useCallback((data) => {
        dispatch(staffActions.selectEmployee(data));

        history.push(`/edit/${data._id}`);
    }, []);

    const remove = useCallback(async (id, fullName) => {
        await dispatch(staffOperations.removeEmployee({ id, fullName }));
        message(`Employee ${fullName} has been deleted`);
    }, []);

    const confirmRemove = useCallback(({ _id: id, fullName }) => {
        confirmAlert({
            message: `Are you sure you want to delete ${fullName}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => remove(id, fullName)
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }, []);

    return (
        <tr>
            <td>{elem.fullName}</td>
            <td>{elem.sex}</td>
            <td>{elem.phone}</td>
            <td>{format(new Date(elem.createDate), 'yyyy-MM-dd HH:mm')}</td>
            <td>{elem.salary}</td>
            <td>{elem.position}</td>
            <td>
                <Button className='waves-effect waves-light btn'
                        onClick={() => edit(elem)}
                >
                    <i className='material-icons'>edit</i>
                </Button>

                <Button className='waves-effect waves-light red accent-1 btn modal-trigger'
                        onClick={() => confirmRemove(elem)}
                >
                    <i className='material-icons'>delete_forever</i>
                </Button>
            </td>
        </tr>
    )
};

EmployeeRow.propTypes = {
    elem: PropTypes.shape({
        _id: PropTypes.number,
        fullName: PropTypes.string,
        sex: PropTypes.string,
        phone: PropTypes.string,
        createDate: PropTypes.number,
        salary: PropTypes.number,
        position: PropTypes.string,
    })
};

export default EmployeeRow;