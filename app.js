const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors= require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//iMPORT ROUTES
const userRoutes = require('./routes/userRoutes');

app.use('/users',userRoutes);
//Routes
//Get , recibir
app.get('/',(req,res)=>{
    res.send('We are on home');
});
/*Post, enviar tu
app.post
app.delete
app.patch, update
 */

//Connect to db
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }, ()=> console.log('Connected to DB!')
);
//How to we start listening to the server
app.listen(3000);