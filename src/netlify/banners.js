const mocks = {
  secondaryBanners: [
    {
      image: '/images/party.jpg',
      buttonText: 'Access',
      url: '/game/306148',
    },
    {
      image: '/images/lite.jpg',
      buttonText: 'Buy',
      url: '/product/2',
    },
  ],
  homeBanners: [
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec turpis vel leo posuere tincidunt. Aliquam erat volutpat. Aliquam eleifend volutpat mollis. Ut quis ornare dolor, a sagittis eros. Sed vulputate finibus sapien, et suscipit tortor aliquet ut.',
      image: '/images/pokemon.jpg',
      buttonText: 'Know More!',
      url: '/game/144054',
      title: 'Pokemon Arceus',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec turpis vel leo posuere tincidunt. Aliquam erat volutpat. Aliquam eleifend volutpat mollis. Ut quis ornare dolor, a sagittis eros. Sed vulputate finibus sapien, et suscipit tortor aliquet ut.',
      image: '/images/switch.jpeg',
      buttonText: 'Get yours now!',
      url: '/product/1',
      title: 'Nintendo Switch OLED',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec turpis vel leo posuere tincidunt. Aliquam erat volutpat. Aliquam eleifend volutpat mollis. Ut quis ornare dolor, a sagittis eros. Sed vulputate finibus sapien, et suscipit tortor aliquet ut.',
      image: '/images/peach.jpg',
      buttonText: 'Know More!',
      url: '/game/254340',
      title: 'Peach Show Time!',
    },
  ],
};

exports.handler = async (event) => {
  const eventName = event.path.replace('/.netlify/functions/banners/', '');
  try {
    const data = JSON.stringify(mocks[eventName]);

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
        error: 'An Error occurred while trying to fetch the banners',
      }),
    };
  }
};
