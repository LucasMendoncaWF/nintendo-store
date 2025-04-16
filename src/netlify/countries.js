const axios = require('axios');
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'text/plain',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Client-ID',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: headers,
      body: 'OK',
    };
  }
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all', {
      headers,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify(error.message),
    };
  }
};
