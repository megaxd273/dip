const express = require('express');
const cors = require ('cors');
const cookieParser = require ('cookie-parser');
const {sq} = require('./sequelize/models/index');
const {User} = require('./sequelize/models/Models');
const router = require('./routes/index');
const errorMiddleware = require('./middleware/errorMiddleware');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const DB_URL= process.env.DB_URL;

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3001',
    credentials:true
}));
app.use('/api', router);
app.use(errorMiddleware)

const startApp = async ()=>{
    try {
        // await sq.authenticate().then(()=>console.log('ok')).catch(error => console.log(error));
        // await sq.sync({force: true}).then(result=>{
        //     console.log(result);
        //   })
        //   .catch(err=> console.log(err));
        app.listen(PORT, ()=>console.log(`started on ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
startApp();