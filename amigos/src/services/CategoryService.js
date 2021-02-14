import { CategoryModel } from "../db/models";

export default class CategoryService {
    /**
     * @desc Creating a category
     *
     * @param {Object} data
     * @returns {Promise<Document>}
     */
    static createCategory = async (data) => {
        return await CategoryModel.create(data);
    }

    /**
     * @desc Updating a category
     *
     * @param {Number} id
     * @param {Object} data
     * @returns {Promise<unknown>}
     */
    static updateCategory = async (id, data) => {
        return await CategoryModel.findByIdAndUpdate(id, data)
            .select([])
            .exec();
    }

    /**
     * @desc Deleting a category
     *
     * @param {Number} id
     * @returns {Promise<unknown>}
     */
    static deleteCategory = async (id) => {
        return await CategoryModel.findByIdAndDelete(id)
            .exec();
    }

    /**
     * @desc Get all categories
     *
     * @returns {Promise<unknown>}
     */
    static getAllCategories = async() => {
        return await CategoryModel.find({})
            .select('-__v')
            .exec();
    }

    /**
     * @desc Get category by Id
     *
     * @param id
     * @returns {Promise<unknown>}
     */
    static getCategoryById = async(id) => {
        return await CategoryModel.findById(id)
            .exec();
    }
};