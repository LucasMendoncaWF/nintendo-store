//fake endpoint

exports.handler = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: '',
  };
};