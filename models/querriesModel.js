const mongoose = require('mongoose')

const querriesSchema = mongoose.Schema(
    {
        firstname:{
            type: String,
            required: [true, "Please Enter your first name"]

        },
        lastname:{
            type: String,
            required: [true, "Please Enter your last name"]

        },
        email:{
            type: String,
            required: [true, "Please Enter your email"]
        },
        message:{
            type: String,
            required: [true, "Please Enter your email"]
        }
    },
    {
        timestamps: true
    }
)
const Querries = mongoose.model('Querries', querriesSchema);
module.exports = Querries;


