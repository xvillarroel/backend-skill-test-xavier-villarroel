const { ApiError } = require("../../utils");
const {
  getAllpayments,
  addNewpayment,
  getpaymentById,
  updatepaymentById,
  deletepaymentById,
} = require("./payment-repository");
const { paymentModuleHandler } = require("./payment-module");

const processGetAllpayments = async () => {
  const payments = await getAllpayments();
  if (payments.length <= 0) {
    throw new ApiError(404, "payments not found");
  }

  return payments;
};

const processAddNewpayment = async (name) => {
  const affectedRow = await addNewpayment(name);
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to add new payment");
  }

  return { message: "payment added successfully" };
};

const processGetpaymentById = async (id) => {
  const payment = await getpaymentById(id);
  if (!payment) {
    throw new ApiError(404, "payment does not exist");
  }

  return payment;
};
const processUpdatepaymentById = async (payload) => {
  const affectedRow = await updatepaymentById(payload);
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to update payment detail");
  }

  return { message: "payment updated successfully" };
};

const processDeletepaymentById = async (id) => {
  const affectedRow = await deletepaymentById(id);
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to delete payment detail");
  }

  return { message: "payment deleted successfully" };
};

module.exports = paymentModuleHandler(async () => {
  return {
    processGetAllpayments,
    processGetpaymentById,
    processUpdatepaymentById,
    processDeletepaymentById,
    processAddNewpayment,
  };
});
