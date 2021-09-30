const User = require('../models/User');

const handleError = (error) => {

    const errors = {
        first_name: '',
        email: '',
        password: ''
    }

    // duplicate errors
    if(error.code === 11000){
        errors.email = "Sorry, that email has been registered already"
        return errors
    }

    //validation errors
    if (error._message == "user validation failed") {
        Object.values(error.errors).forEach(error => {
            errors[error.path] = error.message
        })
    }

    return errors
}

module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = (req, res) => {
    res.send('new signup')
}

module.exports.login_post = async (req, res) => {

    try {
        console.log(req.body);
        const {
            email,
            password
        } = req.body

        const user = await User.create({
            email,
            password
        })
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json(handleError(err))
    }
}