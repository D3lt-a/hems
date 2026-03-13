import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import db from './config/db.js';
import userRoutes from './routes/userRoute.js'
import depRoutes from './routes/depRoute.js'
import postRoutes from './routes/postRoute.js'
import staffRoutes from './routes/staffRoute.js'
import recRoutes from './routes/recRoute.js'

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN || 'http://localhost:5173',
}));

app.use('/users', userRoutes)
app.use('/departments', depRoutes)
app.use('/posts', postRoutes)
app.use('/staff', staffRoutes)
app.use('/recruitment', recRoutes)

app.get('/', (_req, res) => res.send('HEMS Server Running'));

app.listen(PORT, db, () => console.log(`Server running on http://localhost:${PORT}`));
