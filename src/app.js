require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const jsonParser = express.json()
const config = require('./config')

const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
    res.send("hello world")
})

app.post('/', jsonParser,(req, res) => {
    const shoppingList = req.body.shopping_list
    const phone = req.body.phone

    client.messages
    .create({
        body: "Your shopping list from Fridge-Side is : \n\n" + shoppingList,
        from: config.PHONE,
        to: phone
    })
    .then(message =>  res.send(message));
   
 })

  app.use(function errorHandler(error, req, res, next) {
    let response
        if (NODE_ENV === 'production') {
            response = { error: { message: 'server error' } }
        } else {
            console.error(error)
            response = { message: error.message, error }
        }
    res.status(500).json(response)
    })

module.exports = app