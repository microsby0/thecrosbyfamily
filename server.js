const axios = require('axios');
const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');
const { version } = require('./package.json');

const app = express();

const port = process.env.PORT || 8080;
let apiUrl;
if (process.env.API_URL) {
  apiUrl = process.env.API_URL;
} else {
  throw new Error('Error! API_URL not set!');
}
console.log(`apiUrl: ${apiUrl}`);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/health', (req, res) => {
  axios.get(`${apiUrl}/health`)
    .then(axiosRes => {
      res.status(200).json({ version, connectedToApi: true });
    })
    .catch(error => {
      console.error(`API is not connected: ${error.response.status}`);
      return res.status(200).json({ version, connectedToApi: false });
    });
});

app.use('/proxy', proxy(apiUrl));

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
