const orders = [
  {
    products: [144054, 115653],
    date: new Date('02-26-2024').toISOString().split('T')[0],
    price: 21.0,
    id: 1,
  },
  {
    products: [254340, 335355, 332335],
    date: new Date('02-26-2024').toISOString().split('T')[0],
    price: 31.5,
    id: 2,
  },
  {
    products: [199890, 330630],
    date: new Date('02-26-2024').toISOString().split('T')[0],
    price: 21.0,
    id: 3,
  },
];

exports.handler = async () => {
  try {
    const data = JSON.stringify(orders);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'An Error occurred while trying to fetch the orders',
      }),
    };
  }
};
