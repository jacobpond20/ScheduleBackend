const express = require('express');
const connectDB = require('./connect')
const pug = require('pug');
const bodyParser = require('body-parser');

//Import Routes
const loginRoute = require('./routes/login');
const homeRoute = require('./routes/home');
const createUserRoute = require('./routes/createUser');
const loginHomeRoute = require('./routes/loginHome');
const createPersonRoute = require('./routes/createPerson');

//Import express
const app = express();

//Pug setup
app.set('view engine', 'pug');

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/login', loginRoute);
app.use('/', homeRoute);
app.use('/createUser', createUserRoute);
app.use('/loginHome', loginHomeRoute);
app.use('/createPerson', createPersonRoute);


//Connect to DB
connectDB();

app.listen(3000);