const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('auth')
    if( !token )
        return res.status(401).send('Access denied.')

    try {
        const verified = jwt.verify(token, 'sabogi99')
        req.user = verified
        next()
    }catch (e) {
        console.log(e)
        return res.status(401).send('Access Denied.')
    }
}