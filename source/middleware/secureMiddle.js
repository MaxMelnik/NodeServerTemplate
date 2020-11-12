const secureMiddle = async (req, res, next) => {
    const token = req.headers['client'] || req.headers['Client'];

    if (token && token === 'admin') {
        next();
    } else {
        next({err: 'No request from client side'})
    }
}

module.exports = secureMiddle;