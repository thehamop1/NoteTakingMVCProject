const proxy = require('express-http-proxy');
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080
console.log(path.join(__dirname, '../.tmp/public/index.html'))

app.use('/', express.static(path.join(__dirname, '../.tmp/public/')))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../.tmp/public/index.html'));
});

app.use('/api/*', proxy('localhost:1337', {
    forwardPath: function (req, res) {
      return '/api/' + req.url
    }
}));

app.listen(port, () => console.log("Listening on Port", port)) 