const mongoose = require('mongoose');
const {Schema } = mongoose;

const UserScheme = new Schema(
    {
            name: 
            {
                type: String,
            },
            email:
            {
                type: String,
                unique: true
            },
            password: 
            {
                type: String,
            },
            timestamp: 
            {
                type: Date,
                default: Date.now,
            },
    }
);
const User = mongoose.model('User' , UserScheme);
module.exports = User;