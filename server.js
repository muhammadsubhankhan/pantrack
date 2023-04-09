/* eslint-disable const/extensions */
const express = require('express')
const app = express()
require('dotenv').config()
const logger = require('morgan')
const path = require('path')
//const morgan = require('morgan');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/errorHandler.js')
const cors = require('cors')
const PORT = process.env.PORT || 7000

const corsOptions = require('./config/corsOptions.js')

const userRoutes = require('./routes/users.route.js')
const eventRoutes = require('./routes/events.route.js')
const memberRoutes = require('./routes/members.route.js')
const offeringRoutes = require('./routes/offerings.route.js')
const itemRoutes = require('./routes/items.route.js')
const authRoutes = require('./routes/auth.route.js')

// middleware
// app.use(cors(corsOptions))
app.use(
    cors({
        origin: true,
    })
)
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

//subadmin 3 can manipulate
app.use('/offerings', offeringRoutes)

//subadmin 2 3 can manipulate

app.use('/events', eventRoutes)
app.use('/members', memberRoutes)

//subadmin 1 2 3 can create
app.use('/items', itemRoutes)

// error handler
// eslint-disable-next-line

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log('MongoDB Connected')
    } catch (err) {
        console.log(err)
    }
}

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})
