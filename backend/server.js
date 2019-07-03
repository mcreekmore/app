const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', function (req, res) {
 return res.send('Hello world');
});

console.log('Listening on Port 8080');
app.listen(process.env.PORT || 8080);