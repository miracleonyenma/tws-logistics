const User = require('../models/User');
const jwt = require('jsonwebtoken')

const maxAge = 60 * 60 * 24 * 31;

const createToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

const handleError = (error) => {
    console.log('15', error);

    const errors = {
        // first_name: '',
        email: '',
        password: ''
    }

    // duplicate errors
    if (error.code === 11000) {
        errors.email = "Sorry, that email is already registered"
        return errors
    }

    // login errors
    if (error.message === "Incorrect password") errors.password = "Sorry, that passsword was incorrect"
    if (error.message === "Incorrect email") errors.email = "Sorry, that email is not registered"

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

module.exports.signup_post = async (req, res) => {

    try {
        console.log(req.body);
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body

        const user = await User.create({
            first_name,
            last_name,
            email,
            password
        })

        // generate token
        const token = createToken(User._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })

        res.status(201).json({
            user
        })

    } catch (err) {
        res.status(400).json({
            errors: handleError(err)
        })
    }

}

module.exports.login_post = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })

        res.status(200).json({
            user: user._id
        })
    } catch (error) {
        console.log(error.message);

        res.status(400).json({
            errors: handleError(error)
        })
    }
}

module.exports.logout_get = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}