const express = require('express');
const connectDB = require('./connect');
const cors = require('cors');

//Import Routes
const loginRoute = require('./routes/login');
const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');
const loginHomeRoute = require('./routes/loginHome');
const createPersonRoute = require('./routes/createPerson');
const viewPeopleRoute = require('./routes/viewPeople');
const createShiftRoute = require('./routes/createShift');
const roleRoute = require('./routes/role');
const week = require('./routes/week');

//Import express
const app = express();

//Middleware
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/login', loginRoute);
app.use('/role', roleRoute);
app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/loginHome', loginHomeRoute);
app.use('/createPerson', createPersonRoute);
app.use('/viewPeople', viewPeopleRoute);
app.use('/createShift', createShiftRoute);
app.use('/week', week);




//Connect to DB
connectDB();

app.listen(3000);