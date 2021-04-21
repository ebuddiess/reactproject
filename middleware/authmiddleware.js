const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = async function(req,res,next){
    const token = req.header('x-auth-token')

    if(!token){
        res.status(401).json({msg:"authorization denied no token "})
    }

    try {
        const decoded = await jwt.verify(token,config.get("jwtsecret"))
        req.user  = decoded.user
        next()

    } catch (error) {

        res.status(401).json({ msg:"invalid token" } )
    }
}
 