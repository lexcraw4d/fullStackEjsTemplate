const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = 8500
const TestModel = require('./models/schema.sql')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING, 
            {useNewUrlParser:true})
            console.log(`connected to the database', ${mongoose.connection.name}`)
    } catch (err) {
        console.log('Failed to connect', err)
    }
}
connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/', async (request, response) => {
    try {
        //Get data from DB
        const content = await TestModel.find({})
        console.log(content)
        //After data is found, then render ejs AND pass the data so that it can rendor on the page
        response.render('index.ejs', {contentKey:content})
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})


//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})