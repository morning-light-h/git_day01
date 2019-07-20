const  moment=require("moment");
const  conn=require("../db/index.js");
const  marked=require("marked");

const  showAddArticle=(req,res)=>{
    // 登录权限判断
    if(!req.session.islogin) return   res.redirect("/");
    res.render("./article/add.ejs",{
        user:req.session.user,
        islogin:req.session.islogin
    })
};

/* 添加文章 */
const  addArticle=(req,res)=>{
    const  body=req.body;
    //console.log(body,88);
    body.ctime=moment().format("YYYY-MM-DD HH:mm:ss");
    // body.authorid=req.session.user.id;会失效  需要使用隐藏域存储

    const  sql="insert  into  blog_articles set ?";
    conn.query(sql,body,(err,result)=>{
        console.log(err);
        
        if(err) return res.send({msg:"发表文章失败",status:500});
        if(result.affectedRows!==1) return res.send({msg:"发表文章失败",status:501});
        res.send({msg:"发表文章成功",status:200,insertId:result.insertId});
    });
};

/* 文章详情 */
const  showArticleDetail=(req,res)=>{
    const  id=req.params.id;
   
    const  sql="select * from  blog_articles where id=?";
    conn.query(sql,id,(err,result)=>{
        console.log(result,56);
        
        if(err) return res.send({msg:"获取文章详情失败",status:500});
        if(result.length!==1) return res.redirect("/");
        const  html=marked(result[0].content);
        result[0].content=html;
        res.render("./article/info.ejs",{user:req.session.user,islogin:req.session.islogin,article:result[0]});
    });
};


/* 显示文章编辑 */
const  showEditArticle=(req,res)=>{
    if(!req.session.islogin) return  res.redirect("/");
    const  sql="select * from  blog_articles where id=?";
    conn.query(sql,req.params.id,(err,result)=>{
        console.log(result,56);
        if(err) return  res.redirect("/");
        if(result.length!==1) return res.redirect("/");
        res.render("./article/edit.ejs",{user:req.session.user,islogin:req.session.islogin,article:result[0]});
    });
};
/* 确认文章编辑 */
const  editArticle=(req,res)=>{
    const  sql="update  blog_articles set ? where  id=?";
    conn.query(sql,[req.body,req.body.id],(err,result)=>{
        console.log(result,33);
        
        if(err) return res.redirect("/");
        if(result.affectedRows!==1) return res.redirect("/");
        res.send({msg:"编辑文章成功",status:200});
    });
};
module.exports={
    showAddArticle,
    addArticle,
    showArticleDetail,
    showEditArticle,
    editArticle
};