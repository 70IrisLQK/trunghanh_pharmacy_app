import Category from "../models/Category.js";

const CategoryController = {
    getAllCategory: async (req, res) => {
        try {
            const categories = await Category.findAll();

            if (!categories) {
                return res.status(400).json({ success: false, msg: "The category was not found" })
            }
            res.status(200).json({ categories })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const categories = await Category.findByPk(req.params.id);

            if (!categories) {
                return res.status(400).json({ success: false, msg: "The category with given ID was not found" })
            }

            res.status(200).json({ categories })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
}

export default CategoryController