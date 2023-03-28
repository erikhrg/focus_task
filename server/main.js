import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.js'

const app = express()
const corsOptions = {
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())
app.use('/api', authRoutes)


app.listen(8000, () => {
    console.log('Conectado na porta 8000')
}) 