const bcrypt = require('bcrypt')
const User = require('../database/models/User')

module.exports = (req, res) => {

    const { email, password } = req.body;

    // try to find the user
    User.findOne({ email }, (error, user) => {
        if(user) {
            // compare user password.
            bcrypt.compare(password, user.password, (error, same) => {
                // if user password is correct. then, login
                if (same) {
                    // add session for user account
                    req.session.userId = user._id

                    res.redirect('/')
                //  else redirect user back
                } else {
                    res.redirect('/auth/login')
                }
            })
        } else {
            return res.redirect('/auth/login')
        }
    })
}