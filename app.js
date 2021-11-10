const express = require('express');
const connectDB = require('./connect')

//Import Routes
const loginRoute = require('./routes/login');
const homeRoute = require('./routes/home');
const createUserRoute = require('./routes/createUser');
const loginHomeRoute = require('./routes/loginHome');
const createPersonRoute = require('./routes/createPerson');
const viewPeopleRoute = require('./routes/viewPeople');
const createShiftRoute = require('./routes/createShift');
const week = require('./routes/week');

//Import express
const app = express();

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/login', loginRoute);
app.use('/', homeRoute);
app.use('/createUser', createUserRoute);
app.use('/loginHome', loginHomeRoute);
app.use('/createPerson', createPersonRoute);
app.use('/viewPeople', viewPeopleRoute);
app.use('/createShift', createShiftRoute);
app.use('/week', week);


//Connect to DB
connectDB();

app.listen(3000);