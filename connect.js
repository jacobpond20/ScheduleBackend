const mongoose = require('mongoose');
const db = require('mongodb').Db;

//const uri = "mongodb://localhost:27017/CompanyTracker?retryWrites=true&w=majority"; //test for capstone
const uri = "mongodb+srv://admin:admin@scheduleapp.atk7n.mongodb.net/test";

const connectDB = async()=> {
    await mongoose.connect(uri);
    console.log('DB Connected...');
};

module.exports = connectDB;
