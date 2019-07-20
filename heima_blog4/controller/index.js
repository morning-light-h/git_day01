const  conn=require("../db/index.js");

const showIndexPage=(req,res)=>{
    const  nowpage=Number(req.query.page)||1;
    const  pageSize=3;


    // res.render("./index.ejs",{"name":"zs","age":22});
    const  sql=`SELECT  blog_articles.id , blog_articles.title, blog_articles.ctime,blog_users.nickname FROM  blog_articles 
    LEFT JOIN blog_users  ON  blog_articles.authorid=blog_users.id 
    order by blog_articles.id desc
    limit ${(nowpage-1)*pageSize},${pageSize};
    SELECT COUNT(*) AS  count  FROM  blog_articles
    `;
    conn.query(sql,(err,result)=>{
        //console.log(result,22);
        if(err){
            res.render("./index.ejs",{
                user:req.session.user,
                islogin:req.session.islogin,
                articles:[]
            });
        } else{
            const  totalPage=Math.ceil(result[1][0].count/pageSize);
            
            res.render("./index.ejs",{
                user:req.session.user,
                islogin:req.session.islogin,
                articles:result[0],
                totalPage:totalPage,
                nowpage:nowpage
            });
        }
    });

    //res.render("./index.ejs",{user:req.session.user,islogin:req.session.islogin});
};

module.exports={
    showIndexPage
};