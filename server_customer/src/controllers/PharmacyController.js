import Pharmacy from "../models/pharmacy.js";
import { Sequelize } from "sequelize";

const PharmacyController = {
    getAllPharmacy: async (req, res) => {
        try {
            const where = {};
            where.longitude = { [Sequelize.Op.gt]: 0 };
            const { name } = req.query;
            if (name) {
                where.CUSTOMER_NAME = { [Sequelize.Op.like]: `%${name}%` }
            }
            const pharmacies = await Pharmacy.findAll({ where, order: [['created_at', 'DESC']] })

            if (!pharmacies) {
                return res.status(400).json({ msg: "Some error occurred while retrieving pharmacies" })
            }

            res.status(200).json({ status: "success", pharmacies: pharmacies })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    
    getPharmacyById: async (req, res) => {
        const id = req.params.id;
        try {
            const pharmacies = await Pharmacy.findOne({ where: { pharmacy_id: id } })

            if (!pharmacies) {
                return res.status(400).json({ msg: "Some error occurred while retrieving pharmacies by PharmacyID = ", id })
            }

            res.status(200).json({ status: "success", pharmacies: pharmacies })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    createPharmacy: async (req, res) => {
        const { pharmacies } = req.body;
        clg
        try {
            const pharmacy = Pharmacy.bulkCreate(pharmacies).then((pharmacies) => {
                return res.status(200).json({ pharmacies: pharmacies, status: "success" });
            }).catch((error) => {
                return res.status(500).json({ msg: error.message });
            })
            res.status(200).json({ status: "success", pharmacies: pharmacies })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    // updatePharmacy: async (req, res) => {
    //     const id = req.params.id
    //     const { description, reply_Pharmacy, image, user_id, Pharmacy_type_id } = req.body;
    //     try {
    //         const pharmacies = await Pharmacy.update({
    //             description: description,
    //             reply_Pharmacy: reply_Pharmacy,
    //             image: image,
    //             user_id: user_id,
    //             Pharmacy_type_id: Pharmacy_type_id
    //         }, { where: { Pharmacy_id: id } })

    //         if (!pharmacies) {
    //             return res.status(400).json({ msg: "Some error occurred while updating pharmacies with PharmacyID = ", id })
    //         }

    //         res.status(200).json({ status: "success", pharmacies: pharmacies })
    //     } catch (error) {
    //         return res.status(500).json({ msg: error.message })
    //     }
    // },
    // deletePharmacy: async (req, res) => {
    //     const id = req.params.id
    //     try {

    //         const pharmacies = await Pharmacy.destroy({ where: { Pharmacy_id: id } });

    //         if (!pharmacies) {
    //             return res.status(400).json({ msg: "Some error occurred while deleting pharmacies with PharmacyID = ", id })
    //         }

    //         res.status(200).json({ status: "success", pharmacies: pharmacies })
    //     } catch (error) {
    //         return res.status(500).json({ msg: error.message })
    //     }
    // },
}

export default PharmacyController