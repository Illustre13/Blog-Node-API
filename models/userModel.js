const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: [true, "Please Enter your user name"]

        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
const User = mongoose.model('User', userSchema);
module.exports = User;


