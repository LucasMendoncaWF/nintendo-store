

exports.handler = async (event) => {
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
      body: '',
    };
  }

  try {
    const { userName, password } = JSON.parse(event.body);

    const validEmail = 'userlogin@test.com';
    const validPasswordHash = 'ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae';

    if (userName !== validEmail || password !== validPasswordHash) {
      throw new Error();
    }

    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userToken: 'mockUserToken'.toString(),
        name: 'Clark',
        lastName: 'Kent',
        email: validEmail,
        birthday_stamp: new Date('02-26-1979').toISOString().split('T')[0],
        country: 'United States',
        id: 1,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'the typed email or password is wrong' }),
    };
  }
};
