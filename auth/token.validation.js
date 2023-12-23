const {verify}=require("jsonwebtoken")

module.exports = {
    checkToken:(req, res, next) =>{
        let token=req.get("authorization");
        if(token){
            token=token.slice(7);
            verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    res.json({
                        success:false,
                        message:"invalid token",
                    })
                }
                else{
                    next()
                }
            })

        }
        else{
            res.json({
                success:false,
                message:"access denied, authorized user !",
            })
        }
    }
}
