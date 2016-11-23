const io = require('socket.io')();
const fetch = require('isomorphic-fetch');
const emoji=require('node-emoji');

const _messages = [];
const _users = [];

function gifyBot(message) {
  const args = message.text.split(' ').filter( (arg, idx) => idx !== 0).join('+');
  return fetch(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${args}`)
  .then( (response) => {
    if (response.status >= 400) {
        throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then( (resource) => {
    return {
      text: message.text,
      image: resource.data.fixed_height_downsampled_url
    };
  })
  .catch( (error) => {
    return {
      text: 'giphy bot error... sorry.'
    };
  });
};

io.of('/general').on('connection', (socket) => {

  socket.on('user:login', (username, response) => {
    socket.owner = {username: username};
    socket.broadcast.emit('user:joined', {
      username: socket.owner.username,
      time: Date.now()
    });
    response(_messages.slice(-10));
    console.log('user', username, 'joined');
  });

  socket.on('message', (message) => {
    let promise = null;
    if (message.text.indexOf('/giphy ') === 0) {
      promise = gifyBot(message);
    } else {
      promise = Promise.resolve(message);
    }
    promise
    .then( (message) => {
      message.text = emoji.emojify(message.text)
      message.time = Date.now()
      message.username = socket.owner.username;
      _messages.push(message);

      socket.broadcast.emit('user:message', message);
      socket.emit('user:message', message);
      console.log('message', message);
    });
  });

});

io.listen(3001);
