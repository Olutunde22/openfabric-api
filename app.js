import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDb } from './config/db.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import productRoutes from './routes/product.js'

const PORT = process.env.PORT || 3000
const app = express()
colors.enable()

app.use(cors())
app.use(express.static('public'))
app.use(morgan('combined'));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/product', productRoutes)
app.use((req, res) => res.status(404).json({ message: `Sorry!, can't find ${req.get('host')}${req.url}` }))

connectDb()

const server = app.listen(PORT, () => { console.log(`Server running on port ${PORT}...`.blue.bold) })


process.on('unhandledRejection', (err) => {
    console.log(`Server Stopped\nError : ${err.message}`.red)
    server.close(() => { process.exit(1) })
})


