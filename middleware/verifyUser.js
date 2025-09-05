import jwt from 'jsonwebtoken';

export const verifyToken = async(req,res,next) =>{
    try {
        const token = req.headers['authorization'];
        if(!token){
            return res.status(404).json({
                message:'Token not provided'
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}
