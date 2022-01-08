const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const path = require('path');

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

    const { body } = req;

    const {
      keto,
      Name,
      Name2,
      email,
      PhoneNum,
      contactMe
    } = body;
    
    const usedBody = {
      keto,
      Name,
      Name2,
      email,
      contactMe,
      LeadPhones:[
        {
          PhoneNum
        }
      ],
      ListID: 178
    }

    const { data : crmResponse } = await axios.post(`https://${CUSTOMER}.maxcontact.com/webservices/services/LeadManagement/addlead`,
      usedBody,
      {
         headers: 
          {
            'Content-type':'application/json',
            'Cookie':`TokenKey=${apitokenData.TokenKey}`
          }
      }
    );
    console.log({crmResponse});
    return res.redirect("/thankyou/thankyou.html");
    res.status(200).json(crmResponse);

  } catch (error) {
    console.log({error});
    res.status(500).send({message:'Submit failed!'})
  }
});

app.listen(8000, () => {
  console.info(`Server running at http://localhost:8000. You better go catch it!`);
});