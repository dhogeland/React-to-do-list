const express     = require('express'),
      bodyParser  = require('body-parser'),
      cors        = require('cors'),
      config      = require('../config'),
      serverCtrl  = require('./serverCtrl'),
      massive     = require('massive'),
      app         = express();


massive(config.connectionString)
  .then(dbInstance => {
    db = dbInstance;
    app.set('db', dbInstance)
  })
  .catch(err => {
    return err;
  });

app.use(cors());
app.use(bodyParser.json());

app.get('/api/getTask', serverCtrl.getTask);
app.get('/api/getCompletedTask', serverCtrl.getCompletedTask);
app.post('/api/postTask', serverCtrl.postTask);
app.put('/api/completedTask', serverCtrl.completedTask);

app.listen(5000, function() {
  console.log("It's Alive...")
});
