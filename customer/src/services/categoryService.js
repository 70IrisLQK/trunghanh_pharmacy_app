import { API } from "../../http-common.js";

const categoryService = {
    getAllCategory: () => {
        return API.get("/categories");
    },

    getCategoryById: (id) => {
        return API.get(`/categories/:${id}`);
    },
}

export default categoryService;