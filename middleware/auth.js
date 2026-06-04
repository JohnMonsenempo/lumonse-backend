const jwt = require('jsonwebtoken')

function authentifier(req, res, next) {
    let token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé - token manquant' })
    }

    try {
        let tokenPropre = token.replace('Bearer ', '')
        let decoded = jwt.verify(tokenPropre, process.env.JWT_SECRET)
        req.utilisateur = decoded
        next()
    } catch (err) {
        res.status(401).json({ message: 'Token invalide' })
    }
}

module.exports = authentifier