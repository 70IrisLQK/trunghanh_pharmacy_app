import Payment from "../models/Payment.js";

const PaymentController = {
    getAllPayment: async (req, res) => {
        try {
            const payments = await Payment.findAll();

            if (!payments) {
                return res.status(400).json({ success: false, msg: "The payment was not found" })
            }
            res.status(200).json({ payments })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getPaymentById: async (req, res) => {
        try {
            const payments = await Payment.findByPk(req.params.id);

            if (!payments) {
                return res.status(400).json({ success: false, msg: "The payment with given ID was not found" })
            }

            res.status(200).json({ payments })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    createPayment: async (req, res) => {
        const { name } = req.body
        try {
            const payments = await Payment.create({ name: name });

            if (!payments) {
                return res.status(400).json({ success: false, msg: "The payment can't create" })
            }

            res.status(200).json({ payments })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
}

export default PaymentController