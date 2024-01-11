const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
    {
        fullName: {
            type: String, 
            required: [true, "Please enter a Full Name"]
        },
        userName: {
            type: String,
            required: [true, "Please enter a User Name"]
        },
        email: {
            type: String,
            required: [true, "Please enter a Email"],
            unique: true
        },
        phone: {
            type: String,
            required: [true, "Please enter a Phone Number"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please enter a Password"]
        },
        confirmPassword: {
            type: String,
            required: [true, "Please re-enter the Password"]
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Prefer not to say'] 
        }
    },
    {
        timestamps: true
    }
)

const Signup = mongoose.model('Signup', employeeSchema);

module.exports = Signup;