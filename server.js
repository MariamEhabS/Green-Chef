const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;
const path = require('path');
const { header } = require('express/lib/request');
// const login = 'RDJtczEyMyE='

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.post('/', async (req, res) => {
  const formUrl = "https://hookb.in/pzMBJl603ZsRPnrrPr1q"; 
  const { body } = req;
  const { data: crmResponse } = await axios.post(formUrl, body,
     {headers: {Location}

  });

  res.json(crmResponse);
});


app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}. You better go catch it!`);
});