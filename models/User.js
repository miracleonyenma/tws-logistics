const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    first_name: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    last_name: {
        type: String
    }

})

// fire a function after doc saved to db
userSchema.post('save', (doc, next) => {
    console.log('new user saved to db', doc);

    next()
})


// fire function before doc saved to schema
userSchema.pre('save', async function(next){
    const user = this;

    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)

    console.log('user not yet created', user);
    next()
})

const user = mongoose.model('user', userSchema)

module.exports = user;