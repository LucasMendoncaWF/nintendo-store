const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const file = event.path.replace("/.netlify/functions/mocks/", "");
  try {
    const filePath = path.resolve(__dirname, "mocks", `${file}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: 'Erro interno no servidor' }),
    };
  }
}