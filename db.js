const mongoose = require('mongoose');

const connectDB = async () => {
    //Connecting to MongoDB 
    mongoose.set("strictQuery", false)
    mongoose.
    connect('mongodb+srv://Illustre:illustre123@mynodeapi.yls10be.mongodb.net/Blog-Node-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB')
       
    }).catch((error) => {
        console.log(error);
                                
    })
};

module.exports = connectDB;




