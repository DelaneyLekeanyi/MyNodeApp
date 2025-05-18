require('dotenv').config() // Importing the dotenv module to load environment variables from a .env file

const express = require('express') // Importing the express module
const app = express() 

app.use(express.json()) // Creating an instance of express

//importing mongoose to connect to MongoDB
const mongoose = require('mongoose')

//connecting to our mongoDB database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => { //the then method is called when the connection is successful. The then methed is used
  console.log('Connected to MongoDB')
}).catch(err => {
  console.error('Error connecting to MongoDB', err)
})

// Middleware to parse JSON request bodies

// Importing the routes
const membersInfo = require('./routes/members') 
app.use('/members', membersInfo) // Using the members routes

// Importing user routes

app.listen(3000, () => {
  console.log('Server is running on port 3000')
});