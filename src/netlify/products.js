const products = [
  {
    bannerUrl: '/images/switch.jpeg',
    title: 'Nintendo Switch OLED',
    id: '1',
    text: `In fermentum dolor id justo sagittis, non hendrerit ligula venenatis. Nulla sodales finibus lectus id luctus. Donec at sapien consequat, cursus risus at, ullamcorper quam. Curabitur condimentum tortor quis semper porttitor. Nunc luctus congue nisl sed consectetur. Donec rhoncus tortor non hendrerit maximus. Integer tincidunt consequat porttitor. Cras vehicula metus eget mi lobortis tempus. Sed est justo, ultrices ut dictum a, auctor sed sapien. Nam quis tincidunt massa. Donec sed metus hendrerit, mattis lectus vitae, tincidunt neque. Etiam a sagittis velit. Sed ac faucibus nibh, eget rutrum elit. Donec non ultrices orci, a convallis ipsum. Duis diam lorem, sagittis eu malesuada a, porta a arcu. Fusce sagittis eu sem accumsan gravida.
    \n
    Pellentesque nunc sapien, semper ac sollicitudin et, ultrices eu tellus. Sed quis tortor ut ligula dictum vehicula. Maecenas vel consequat nisi, ornare interdum mauris. Nullam faucibus orci non risus euismod, in ornare dui vulputate. Pellentesque nec placerat libero. Maecenas justo augue, tincidunt sed dui in, consectetur rutrum est. Curabitur faucibus est posuere mauris porta consequat. Praesent consectetur eu massa a rhoncus.
    \n
    Praesent rutrum aliquam mauris, ut condimentum quam. Nunc tristique, augue interdum tristique lacinia, nibh lacus tincidunt ante, ac dictum leo quam et orci. Etiam a porta nisl. In rhoncus neque ut felis blandit, a pellentesque sem aliquet. Vivamus sapien velit, consectetur non lacinia pellentesque, auctor in sem. Nullam posuere, risus eget congue auctor, erat enim hendrerit nisl, sit amet auctor risus lacus ac lacus. Nullam id auctor nibh, vel finibus nisl. Aliquam semper gravida blandit.`,
    text2: `In fermentum dolor id justo sagittis, non hendrerit ligula venenatis. Nulla sodales finibus lectus id luctus. Donec at sapien consequat, cursus risus at, ullamcorper quam. Curabitur condimentum tortor quis semper porttitor. Nunc luctus congue nisl sed consectetur. Donec rhoncus tortor non hendrerit maximus. Integer tincidunt consequat porttitor. Cras vehicula metus eget mi lobortis tempus. Sed est justo, ultrices ut dictum a, auctor sed sapien. Nam quis tincidunt massa. Donec sed metus hendrerit, mattis lectus vitae, tincidunt neque. Etiam a sagittis velit. Sed ac faucibus nibh, eget rutrum elit. Donec non ultrices orci, a convallis ipsum. Duis diam lorem, sagittis eu malesuada a, porta a arcu. Fusce sagittis eu sem accumsan gravida.
    \n
    Praesent rutrum aliquam mauris, ut condimentum quam. Nunc tristique, augue interdum tristique lacinia, nibh lacus tincidunt ante, ac dictum leo quam et orci. Etiam a porta nisl. In rhoncus neque ut felis blandit, a pellentesque sem aliquet. Vivamus sapien velit, consectetur non lacinia pellentesque, auctor in sem. Nullam posuere, risus eget congue auctor, erat enim hendrerit nisl, sit amet auctor risus lacus ac lacus. Nullam id auctor nibh, vel finibus nisl. Aliquam semper gravida blandit.`,
  },
  {
    bannerUrl: '/images/lite.jpg',
    title: 'Nintendo Switch LITE',
    id: '2',
    text: `In fermentum dolor id justo sagittis, non hendrerit ligula venenatis. Nulla sodales finibus lectus id luctus. Donec at sapien consequat, cursus risus at, ullamcorper quam. Curabitur condimentum tortor quis semper porttitor. Nunc luctus congue nisl sed consectetur. Donec rhoncus tortor non hendrerit maximus. Integer tincidunt consequat porttitor. Cras vehicula metus eget mi lobortis tempus. Sed est justo, ultrices ut dictum a, auctor sed sapien. Nam quis tincidunt massa. Donec sed metus hendrerit, mattis lectus vitae, tincidunt neque. Etiam a sagittis velit. Sed ac faucibus nibh, eget rutrum elit. Donec non ultrices orci, a convallis ipsum. Duis diam lorem, sagittis eu malesuada a, porta a arcu. Fusce sagittis eu sem accumsan gravida.
    \n
    Praesent rutrum aliquam mauris, ut condimentum quam. Nunc tristique, augue interdum tristique lacinia, nibh lacus tincidunt ante, ac dictum leo quam et orci. Etiam a porta nisl. In rhoncus neque ut felis blandit, a pellentesque sem aliquet. Vivamus sapien velit, consectetur non lacinia pellentesque, auctor in sem. Nullam posuere, risus eget congue auctor, erat enim hendrerit nisl, sit amet auctor risus lacus ac lacus. Nullam id auctor nibh, vel finibus nisl. Aliquam semper gravida blandit.`,
    text2: `In fermentum dolor id justo sagittis, non hendrerit ligula venenatis. Nulla sodales finibus lectus id luctus. Donec at sapien consequat, cursus risus at, ullamcorper quam. Curabitur condimentum tortor quis semper porttitor. Nunc luctus congue nisl sed consectetur. Donec rhoncus tortor non hendrerit maximus. Integer tincidunt consequat porttitor. Cras vehicula metus eget mi lobortis tempus. Sed est justo, ultrices ut dictum a, auctor sed sapien. Nam quis tincidunt massa. Donec sed metus hendrerit, mattis lectus vitae, tincidunt neque. Etiam a sagittis velit. Sed ac faucibus nibh, eget rutrum elit. Donec non ultrices orci, a convallis ipsum. Duis diam lorem, sagittis eu malesuada a, porta a arcu. Fusce sagittis eu sem accumsan gravida.
    \n
    Pellentesque nunc sapien, semper ac sollicitudin et, ultrices eu tellus. Sed quis tortor ut ligula dictum vehicula. Maecenas vel consequat nisi, ornare interdum mauris. Nullam faucibus orci non risus euismod, in ornare dui vulputate. Pellentesque nec placerat libero. Maecenas justo augue, tincidunt sed dui in, consectetur rutrum est. Curabitur faucibus est posuere mauris porta consequat. Praesent consectetur eu massa a rhoncus.
    \n
    Praesent rutrum aliquam mauris, ut condimentum quam. Nunc tristique, augue interdum tristique lacinia, nibh lacus tincidunt ante, ac dictum leo quam et orci. Etiam a porta nisl. In rhoncus neque ut felis blandit, a pellentesque sem aliquet. Vivamus sapien velit, consectetur non lacinia pellentesque, auctor in sem. Nullam posuere, risus eget congue auctor, erat enim hendrerit nisl, sit amet auctor risus lacus ac lacus. Nullam id auctor nibh, vel finibus nisl. Aliquam semper gravida blandit.`,
  },
];

exports.handler = async (event) => {
  try {
    const pathSplitted = event.path.split('/');
    const id = pathSplitted[pathSplitted.length - 1];
    const data = JSON.stringify(products.find((product) => product.id === id));
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
