const jwt=require('jsonwebtoken');

class Jwt{

    verifyAccessToken=(req,res,next)=>{

        const authorization=req.headers.authorization
        if(!authorization)
            return res.status(401).json({error:'Token not found'});
        const token=req.headers.authorization.split(' ')[1];
    
        if(!token)
            return res.status(401).json({error:'Unauthorized'});
    
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decoded;
            console.log(decoded);
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({error:'Invalid token'});
        }
    }
    
    generateToken=(userData)=>{
        
        try {
            const jwtToken=jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
            return jwtToken;       
        } catch (error) {
            console.error(error);
        }
    }

    logRequest = (req, res, next) => {
        console.log(`[${new Date().toLocaleString()}] ${req.method} Request made to: ${req.originalUrl}`);
        next();
    }
}

module.exports = new Jwt();
