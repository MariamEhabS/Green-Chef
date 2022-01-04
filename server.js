const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const path = require('path');
// const login = 'RDJtczEyMyE='

require('dotenv').config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

const {CUSTOMER, LOGIN, PASSWORD, PORT} = process.env;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', async (req, res) => {
  try {
    const { data : apitokenData } = await axios.get(`https://${CUSTOMER}.maxcontact.com/webservices/services/apitoken/login/${LOGIN}`, {
      headers:{
        'Authorization':PASSWORD
      }
    })

    // console.log(apitokenData.TokenKey);

    // const formUrl = "https://hookb.in/pzMBJl603ZsRPnrrPr1q"; 
    const { body } = req;

    const { data : crmResponse } = await axios.post(`https://${CUSTOMER}.maxcontact.com/webservices/services/LeadManagement/addlead`,
      {
        ...body, 
        "ListID": 178
      },
      {
         headers: 
          {
            'Content-type':'application/json',
            'Cookie':`TokenKey=${apitokenData.TokenKey}`
          }
      }
    );
  
    console.log({crmResponse});
    res.status(200).json(crmResponse);
  } catch (error) {
    console.log({error});
    res.status(500).send({message:'Submit failed!'})
  }
});

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}. You better go catch it!`);
});