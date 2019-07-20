const  express=require("express");
const  router=express.Router();

const ctrl=require("../controller/article.js");

router.get("/article/add",ctrl.showAddArticle);
router.post("/addArticle",ctrl.addArticle);
/* 详情页 */
router.get("/article/info/:id",ctrl.showArticleDetail);
/* 展示编辑页+编辑页 */
router.get("/article/edit/:id",ctrl.showEditArticle);
router.post("/article/edit",ctrl.editArticle);


module.exports=router;