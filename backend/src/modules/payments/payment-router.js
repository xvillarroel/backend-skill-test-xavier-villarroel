const express = require("express");
const router = express.Router();
const paymentController = require("./payment-controller");

router.get("", paymentController.handleGetAllpayments);
router.post("", paymentController.handleAddNewpayment);
router.get("/:id", paymentController.handleGetpaymentById);
router.put("/:id", paymentController.handleUpdatepaymentById);
router.delete("/:id", paymentController.handleDeletepaymentById);

module.exports = { paymentRoutes: router };
