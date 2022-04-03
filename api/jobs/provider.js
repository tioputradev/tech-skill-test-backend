const axios = require("axios");

const requestJobsData = async () => {
  const data = await axios.get(
    "http://dev3.dansmultipro.co.id/api/recruitment/positions.json"
  );

  return data.data;
};

const requestJobDetail = async (id) => {
  const data = await axios.get(
    `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
  );

  return data.data;
};

module.exports = { requestJobsData, requestJobDetail };
