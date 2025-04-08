const mocks = {
  secondaryBanners: [
    {
      "image": "images/party.jpg",
      "buttonText": "Access"
    },
    {
      "image": "images/lite.jpg",
      "buttonText": "Buy"
    }
  ],
  homeBanners: [
    {
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec turpis vel leo posuere tincidunt. Aliquam erat volutpat. Aliquam eleifend volutpat mollis. Ut quis ornare dolor, a sagittis eros. Sed vulputate finibus sapien, et suscipit tortor aliquet ut.",
      "image": "images/pokemonza.jpg",
      "title": "Know More!",
      "price": 80.00
    },
    {
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec turpis vel leo posuere tincidunt. Aliquam erat volutpat. Aliquam eleifend volutpat mollis. Ut quis ornare dolor, a sagittis eros. Sed vulputate finibus sapien, et suscipit tortor aliquet ut.",
      "image": "images/switch.jpeg",
      "title": "Get yours now!",
      "price": 399.00
    },
    {
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec turpis vel leo posuere tincidunt. Aliquam erat volutpat. Aliquam eleifend volutpat mollis. Ut quis ornare dolor, a sagittis eros. Sed vulputate finibus sapien, et suscipit tortor aliquet ut.",
      "image": "images/peach.jpg",
      "title": "Know More!",
      "price": 80.00
    }
  ]
}

exports.handler = async (event) => {
  const eventName = event.path.replace("/.netlify/functions/mocks/", "");
  try {
    const data = mocks[eventName];

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