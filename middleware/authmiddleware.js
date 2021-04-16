const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = async function(req,res,next){
    const token = req.header('x-auth-token')
    console.log(token + "from line 7 authmiddleware")

    if(!token){
        res.status(401).json({msg:"authorization denied no token "})
    }

    try {
        const decoded = await jwt.verify(token,config.get("jwtsecret"))
        console.log(decoded.user + "from line 14 authmiddleware")
        req.user  = decoded.user
        next()

    } catch (error) {

        res.status(401).json({ msg:"invalid token" } )
    }
}
 