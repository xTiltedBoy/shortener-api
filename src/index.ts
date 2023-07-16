import express from 'express'
import urlRouter from './routes/urls'

const app = express()
app.use(express.json())

const PORT = 4000

app.use('/api/urls', urlRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})