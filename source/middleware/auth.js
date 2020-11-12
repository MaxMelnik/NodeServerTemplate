const jwt = require('jsonwebtoken')

const {User} = require('../schema/')
const config = require('../config')

const auth = async (req, res, next) => {
    if (!req.header('Authorization')) {
        console.error('Not authorized to access this resource');
        res.status(401).send({error: 'Not authorized to access this resource'});
    } else {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, config.secretKey)

        try {
            const user = await User.findOne({_id: data._id, 'tokens.token': token})
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token

            next()
        } catch (error) {
            console.error('Not authorized to access this resource');
            res.status(401).send({error: 'Not authorized to access this resource'})
        }
    }


}
module.exports = auth