import React, { useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import axios from "axios";
import { format } from "date-fns";
import { useMessage } from "../../hooks/message.hook";
import { userSelectors } from "../../store/user";
import { staffActions, staffOperations } from "../../store/staff";
import Button from "../Button";
import { URL_STAFF} from "../../constants/url";
import 'react-confirm-alert/src/react-confirm-alert.css';

const EmployeeRow = ({ elem }) => {
    const token = useSelector(userSelectors.getToken);
    const dispatch = useDispatch();
    const history = useHistory();
    const message = useMessage();

    const edit = useCallback((data) => {
        dispatch(staffActions.selectEmployee(data));

        history.push(`/edit/${data._id}`);
    }, []);

    const remove = useCallback((id, fullName) => {
        axios.delete(URL_STAFF, {
            headers: { "Authorization": token},
            data: {
                id
            }
        })
            .then(res => {
                dispatch(staffOperations.removeEmployee(id));
                message(`Employee ${fullName} was deleted`);
            })
            .catch(({ response }) => message(response.data.message));
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
}

export default memo(EmployeeRow);