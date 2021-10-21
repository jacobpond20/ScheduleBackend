const mongoose = require('mongoose');

//const uri = "mongodb://localhost:27017/CompanyTracker?retryWrites=true&w=majority"; //test for capstone
const uri = "mongodb+srv://user1:user1@scheduleapp.dw63x.mongodb.net/ScheduleApp?retryWrites=true&w=majority";

const connectDB = async()=> {
    await mongoose.connect(uri);
    console.log('DB Connected...');
};

module.exports = connectDB;