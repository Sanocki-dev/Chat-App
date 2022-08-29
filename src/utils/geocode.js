const axios = require("axios");

const geocode = async (coords) => {
  const url = `http://api.positionstack.com/v1/reverse?access_key=${
    process.env.POSITION_API_KEY
  }&query=${encodeURIComponent(coords)}`;

  try {
    const response = await axios.get(url);
    return response.data.data[0];
  } catch (error) {
    return "Unable to make request. Please try again!";
  }
};

module.exports = geocode;
