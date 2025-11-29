const asyncHandler = require("express-async-handler");
const { processGetAllpayments, processAddNewpayment, processGetpaymentById, processUpdatepaymentById, processDeletepaymentById } = require("./payment-service");

const handleGetAllpayments = asyncHandler(async (req, res) => {
    const payments = await processGetAllpayments();
    res.json({ payments });
});

const handleAddNewpayment = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const message = await processAddNewpayment(name);
    res.json(message);
});

const handleGetpaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const payment = await processGetpaymentById(id);
    res.json(payment);
});

const handleUpdatepaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const message = await processUpdatepaymentById({ id, name });
    res.json(message);
});

const handleDeletepaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await processDeletepaymentById(id);
    res.json(message);
});

module.exports = {
    handleGetAllpayments,
    handleGetpaymentById,
    handleUpdatepaymentById,
    handleDeletepaymentById,
    handleAddNewpayment
};