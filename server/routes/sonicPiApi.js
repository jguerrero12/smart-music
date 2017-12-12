// Start page
let User = require('../models/user.js');

const sonicPiApi = (app) => {
  // Answer API requests.
  const apiTest = (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  };

  // start music by adding initial instrument
  const startMusic = (req, res) => {
    pyshell.send('add_instrument');
    res.send('Start');
  };

  const playMusic = (req, res) => {
    pyshell.send('play');
    res.send('Play');
  };

  const stopMusic = (req, res) => {
    pyshell.send('stop');
    res.send('Stop');
  };

  const addInstrument = (req, res) => {
    pyshell.send('add_instrument');
    res.send('Added instrument');
  };

  app.get('/api', isLoggedIn, apiTest);
  app.get('/start', isLoggedIn, startMusic);
  app.get('/play', isLoggedIn, playMusic);
  app.get('/stop', isLoggedIn, stopMusic);
  app.get('/add-instrument', isLoggedIn, addInstrument);

  return app;
}

module.exports = sonicPiApi
