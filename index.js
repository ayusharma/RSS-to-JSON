var express = require('express');
var app = express();
var Feed = require('rss-to-json');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res, next) {
  if (req.query.feedURL) {
    Feed.load(req.query.feedURL, function(err, rss){
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(rss);
      }
    });
  } else {
    res.status(400).send({ 'error': 'feedURL is required' });
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
