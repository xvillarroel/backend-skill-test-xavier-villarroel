const { processDBRequest } = require("../../utils");

const getAllpayments = async () => {
    const query = "SELECT * FROM payments";
    const { rows } = await processDBRequest({ query });
    return rows;
}

const addNewpayment = async (name) => {
    const query = "INSERT INTO payments(name) VALUES ($1)";
    const queryParams = [name];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const getpaymentById = async (id) => {
    const query = "SELECT * FROM payments WHERE id = $1";
    const queryParams = [id];
    const { rows } = await processDBRequest({ query, queryParams });
    return rows[0];
}

const updatepaymentById = async (payload) => {
    const { id, name } = payload;
    const query = `
        UPDATE payments
            SET name = $1
        WHERE id = $2
    `;
    const queryParams = [name, id];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

const deletepaymentById = async (id) => {
    const query = `DELETE FROM payments WHERE id = $1`;
    const queryParams = [id];
    const { rowCount } = await processDBRequest({ query, queryParams });
    return rowCount;
}

module.exports = {
    getAllpayments,
    getpaymentById,
    updatepaymentById,
    deletepaymentById,
    addNewpayment
};
