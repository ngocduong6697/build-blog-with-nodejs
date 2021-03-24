const User = require('../database/models/User')

module.exports = (req, res, next) => {
    // fetch user from database
    if (req.session.userId) {
        res.redirect('/')
    }

    next()
}