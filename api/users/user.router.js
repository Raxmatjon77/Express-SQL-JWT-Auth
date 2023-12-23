const {createUser,
    getUserById,
    getUsers,
    deleteUser,
    updateUser,login}=require("./user.controller.js");
const {checkToken}=require("./../../auth/token.validation.js")
const router = require("express").Router();


router.post("/login",login);
router.post("/",createUser);
router.get("/",checkToken,getUsers);
router.get("/:id",checkToken,getUserById);
router.patch("/:id",checkToken,updateUser);
router.delete("/:id",checkToken,deleteUser);



module.exports =router;
