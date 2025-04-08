const axios = require("axios");

const mockPrice = (name) => {
  name = name.toLowerCase();
  let price = 5.22;
  if('abcdef'.includes(name[0])) {
    price = 41.50;
  }

  if('ghijk'.includes(name[0])) {
    price = 60.50;
  }

  if('lmnopqrs'.includes(name[0])) {
    price = 10.50;
  }

  if('tuvxzw'.includes(name[0])) {
    price = 32.50;
  }

  return price;
}

exports.handler = async (event) => {
  const newHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": 'text/plain',
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Client-ID",
    "Authorization": event.headers?.authorization || "", 
    "Client-ID": event.headers?.["client-id"] || ""
  };
  const requestBody = event.body ? JSON.parse(event.body) : {};

  let newBody = '';
  if(requestBody.filters?.name) {
    newBody+= `search "${requestBody.filters?.name}"; `
  }
  newBody +=`fields ${requestBody.fields}; `;
  newBody+= `where platforms = 130 & first_release_date < ${(new Date().getTime() / 1000).toFixed()}${requestBody.ids? ` & id=(${requestBody.ids.join(', ')})` : ''}; `
  if(!requestBody.filters?.name && requestBody.sort){
    newBody+= `sort ${requestBody.sort}; `; 
  }
  if(requestBody.limit) {
    newBody += `limit ${requestBody.limit}; `;
  }
  if(requestBody.offset !== undefined) {
    newBody += ` offset ${requestBody.offset}; `;
  }

  try {
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: newHeaders,
        body: "OK",
      };
    }
    const endpoint = event.path.replace("/.netlify/functions/igdb/", "");
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const response = await axios.post(
      `https://api.igdb.com/v4/${endpoint}`,
      newBody,
      {
        headers: newHeaders
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(endpoint.includes('count') ? response.data : 
      response.data.map(game => {
        return {
          ...game,
          price: mockPrice(game.name)
        }
      })),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      headers: newHeaders,
      body: JSON.stringify(
        error.message
      ),
    };
  }
};