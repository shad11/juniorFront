import api from "./api";
import { EMPLOYEE } from "../constants/endpoints";

export default {
    async create(values, token) {
        const { data }  = await api.post(EMPLOYEE, values, {
            headers: { "Authorization": token }
        });
        
        return data;
    },

    async edit(values, token) {
        const { data }  = await api.put(EMPLOYEE, values, {
            headers: { "Authorization": token }
        });

        return data;
    },

    async delete(id, token) {
        await api.delete(EMPLOYEE, {
            headers: { "Authorization": token},
            data: {
                id
            }
        });
    },

    async getAll() {
        const { data }  = await api.get(EMPLOYEE);

        return data;
    }
}