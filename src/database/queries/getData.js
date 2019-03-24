const conection = require('../config/db_connection');

const getProposal = (specId) => {
  const sql = 'select * from proposal where specalization_id = $1';
  const values = [specId];
  return conection.query(sql, values);
};

module.exports = getProposal;
