const pool=require("./../../config/database");



module.exports ={
create:(data,callback)=>{

        pool.query(`insert into users(firstname,lastname,gender,email,password,number)
         values(?,?,?,?,?,?)`,[
            data.firstname,
            data.lastname,
            data.gender,
            data.email,
            data.password,
            data.number
         ],(err,results,fields)=>{
            if(err){
             return   callback(err);
            }
            return callback(null,results)
         })
},
getUsers:callback=>{
   pool.query(`select id , firstname,lastname,gender,email from users`,{},(err,results,fields)=>{
      if(err){

         return callback(err);
      }
      return callback(null,results)
   })
},
getUserByEmail:(email,callback)=>{
  pool.query(`select * from users where email=?`,
  [email],
  (err,results,fields)=>{
    if(err){
      console.log(err);
      callback(err);
    }
    console.log(results);
    return callback(null,results[0])
  })
},
getUserById:(id, callBack) => {
   pool.query(
     `select id,firstname,lastname,gender,email,number from users where id = ?`,
     [id],
     (error, results, fields) => {
       if (error) {
         callBack(error);
       }
       return callBack(null, results[0]);
     }
   );
 },
 updateUser: (data, callBack) => {
   pool.query(
     `update users set firstname=?, lastname=?, gender=?, email=?, password=?, number=? where id = ?`,
     [
       data.firstname,
       data.lastname,
       data.gender,
       data.email,
       data.password,
       data.number,
       data.id
     ],
     (error, results, fields) => {
       if (error) {
         callBack(error);
       }
       return callBack(null, results);
     }
   );
 },
 deleteUser: (id, callBack) => {
   console.log(id);
   pool.query(
     `delete from users where id = ?`,
     [id],
     (error, results, fields) => {
       if (error) {
         callBack(error);
       }
       console.log(error);
       console.log(results);
       return callBack(null, results);
     }
   );
 }}
