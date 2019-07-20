const  express=require("express");
const  router=express.Router();

const ctrl=require("../controller/user.js");
router.get("/register",ctrl.showRegisterPage);
router.get("/login",ctrl.showLoginPage);

router.post("/register",ctrl.register);
router.post("/login",ctrl.login);

router.get("/logout",ctrl.logout);

module.exports=router;