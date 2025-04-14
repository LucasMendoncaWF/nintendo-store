const axios = require("axios");

const mockPrice = (name) => {
  const firstLetter = name.toLowerCase()[0];
  if ('abcdef'.includes(firstLetter)) return 41.50;
  if ('ghijk'.includes(firstLetter)) return 60.50;
  if ('lmnopqrs'.includes(firstLetter)) return 10.50;
  if ('tuvxzw'.includes(firstLetter)) return 32.50;
  return 5.22;
};

const buildHeaders = (event) => ({
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "text/plain",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Client-ID",
  "Authorization": event.headers?.authorization || "",
  "Client-ID": event.headers?.["client-id"] || ""
});

const endPoints = {
  count: async (headers, body) => {
    const response = await axios.post("https://api.igdb.com/v4/games/count", body, {
      headers
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  },

  cart: async (headers, body) => {
    const response = await axios.post("https://api.igdb.com/v4/games", body, {
      headers
    });

    const enrichedGames = response.data.map(game => ({
      ...game,
      price: mockPrice(game.name)
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(enrichedGames),
    };
  },

  default: async (headers, body) => {
    const response = await axios.post("https://api.igdb.com/v4/games", body, {
      headers
    });

    const enrichedGames = response.data.map(game => ({
      ...game,
      price: mockPrice(game.name)
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(enrichedGames),
    };
  }
}

const buildBody = (requestBody, isCart) => {
  let query = "";

  if (requestBody.name) {
    query += `search "${requestBody.name}"; `;
  }

  query += `fields ${requestBody.fields}; `;

  const whereFields = [];

  if (!requestBody.fields?.includes("expanded_games") && !isCart) {
    const timestamp = Math.floor(Date.now() / 1000);
    whereFields.push(`platforms = 130 & first_release_date < ${timestamp}`);
  }

  if (requestBody.ids) {
    whereFields.push(`id=(${requestBody.ids.join(", ")})`);
  }

  if (whereFields.length > 0) {
    query += `where ${whereFields.join(" & ")}; `;
  }

  if (!requestBody.name) {
    query += `sort first_release_date desc; `;
  }

  if (requestBody.limit) {
    query += `limit ${requestBody.limit}; `;
  }

  if (requestBody.offset !== undefined) {
    query += `offset ${requestBody.offset}; `;
  }

  return query;
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: buildHeaders(event),
      body: "OK",
    };
  }

  const headers = buildHeaders(event);
  const requestBody = event.body ? JSON.parse(event.body) : {};
  const endpoint = event.path.replace('/.netlify/functions/igdb/games', '').replace('/', '');
  const body = buildBody(requestBody, endpoint === 'cart');
  try {
    return await endPoints[!!endpoint ? endpoint : 'default'](headers, body);
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify(error.message),
    };
  }
};