const mocks = {
  secondaryBanners: [
    {
      "image": "images/party.jpg",
      "buttonText": "Access",
      "url": "/game/306148"
    },
    {
      "image": "images/lite.jpg",
      "buttonText": "Buy",
    }
  ],
  homeBanners: [
    {
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec turpis vel leo posuere tincidunt. Aliquam erat volutpat. Aliquam eleifend volutpat mollis. Ut quis ornare dolor, a sagittis eros. Sed vulputate finibus sapien, et suscipit tortor aliquet ut.",
      "image": "images/pokemon.jpg",
      "title": "Know More!",
      "url": "/game/144054",
    },
    {
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec turpis vel leo posuere tincidunt. Aliquam erat volutpat. Aliquam eleifend volutpat mollis. Ut quis ornare dolor, a sagittis eros. Sed vulputate finibus sapien, et suscipit tortor aliquet ut.",
      "image": "images/switch.jpeg",
      "title": "Get yours now!",
    },
    {
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec turpis vel leo posuere tincidunt. Aliquam erat volutpat. Aliquam eleifend volutpat mollis. Ut quis ornare dolor, a sagittis eros. Sed vulputate finibus sapien, et suscipit tortor aliquet ut.",
      "image": "images/peach.jpg",
      "title": "Know More!",
      "url": "/game/254340",
    }
  ]
}

exports.handler = async (event) => {
  const eventName = event.path.replace("/.netlify/functions/mocks/", "");
  try {
    const data = JSON.stringify(mocks[eventName]);

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
      body: JSON.stringify({ error: 'An Error occurred while trying to fetch the banners' }),
    };
  }
}