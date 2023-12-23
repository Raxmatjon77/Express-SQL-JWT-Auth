const {create,getUsers,getUserById,updateUser,deleteUser,getUserByEmail}=require('./user.service');
const {hashSync,genSaltSync,compareSync} =require("bcrypt")
const { sign } =require("jsonwebtoken")

module.exports ={
    createUser:(req, res, ) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"database connection error",
            })
                
        } 
        return res.status(200).json({
            success:1,
            data:results
         });
    
})},
getUserById:(req, res,) =>{
    const id = req.params.id;
    getUserById(id,(err,results)=>{
        if(err){
            console.log(err);
            return 
        }
        if(!results){
            return res.json({success:0,message:"record not found"})
        }

        return res.json({
            success:1,data:results
        });
    })
},
updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if(!results){
        return res.json({success:0,message:"record not found"})
      }
     if(results){
      console.log(results);
      return res.json({
        success: 1,
        message: "updated successfully"
      });
     }
      
    });
  },
  deleteUser: (req, res) => {
    // const data = req.body;
     const id = req.params.id;
    deleteUser(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if(err){
        console.log(err);
      }
      if(!results){
        return res.json({
          success:0,
          message:"no user found !"
        })
      }
      const result=compareSync(body.password,results.password)
      if(result){
        results.password=undefined
        const jsonwebtoken=sign({result:results},process.env.JWT_SECRET,{expiresIn:"24h"})
        return res.json({
          success:1,
          message:"login successfully completed",
          accessToken:jsonwebtoken
        });
      }
      else{
        return res.json({
          success:0,
          message:"invalid email or password",
        
        });
      }
    })
  }
  
  }