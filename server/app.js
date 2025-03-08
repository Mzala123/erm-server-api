import dotenv from 'dotenv';
dotenv.config();
import express from  'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { fileURLToPath } from 'url'

import sequelize from './model/db.js'

import Patient from './model/patient.js';

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

var app = express()

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true})
        console.log('Connection has been established successfully');
    } catch (error) {
        console.error('Error in establishing a connection!', error);
    }
};

// Call the function
initializeDatabase();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/api', indexRouter);
app.use('/users', usersRouter);

export default app;


