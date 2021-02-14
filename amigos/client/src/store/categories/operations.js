import axios from "axios";
import actions from "./actions";

const getCategories = () => dispatch => {
    const token = localStorage.getItem('token');

    dispatch(actions.categoriesLoading(true));

    axios.get(`/api/categories`,{
        headers: { "Authorization": token }
    }).then(res => {
        dispatch(actions.categoriesSaving(res.data.data));
        dispatch(actions.categoriesLoading(false));
    }).catch(err => {
        console.log(err);
        dispatch(actions.categoriesLoading(false));
    });
};

export default {
    getCategories
};
