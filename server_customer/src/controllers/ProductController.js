import Product from "../models/product.js";
import Category from "../models/category.js";
import Unit from "../models/unit.js";
import { Sequelize } from "sequelize";

const ProductController = {
    getAllProduct: async (req, res) =>
    {
        try
        {
            const where = {};
            where.price = { [Sequelize.Op.gt]: 0 };
            where.isActive = { [Sequelize.Op.eq]: true };
            const { name, categories } = req.query;
            if (name)
            {
                where.product_name = { [Sequelize.Op.like]: `%${name}%` }
            }
            if (categories)
            {
                where.category_id = { [Sequelize.Op.like]: `%${categories}%` }
            }
            const products = await Product.findAll({ where, include: [{ model: Unit, attributes: ['name'] }, { model: Category }] });

            if (!products)
            {
                return res.status(400).json({ success: false, msg: "Some error occurred while retrieving products" })
            }

            res.status(200).json({ products })
        } catch (error)
        {
            return res.status(500).json({ msg: error.message })
        }
    },
    getPopularProduct: async (req, res) =>
    {
        try
        {
            const products = await Product.findAll({ where: { price: { [Sequelize.Op.gt]: 0 } }, include: [{ model: Unit, attributes: ['name'] }], order: [['quantity', 'DESC']] });

            if (!products)
            {
                return res.status(400).json({ success: false, msg: "Some error occurred while retrieving products" })
            }

            res.status(200).json({ products, success: "OK" })
        } catch (error)
        {
            return res.status(500).json({ msg: error.message })
        }
    },
    getProductById: async (req, res) =>
    {
        try
        {
            const products = await Product.findByPk(req.params.id);

            if (!products)
            {
                return res.status(400).json({ success: false, msg: "The product with given ID was not found" })
            }

            res.status(200).json({ products })
        } catch (error)
        {
            return res.status(500).json({ msg: error.message })
        }
    },
}

export default ProductController