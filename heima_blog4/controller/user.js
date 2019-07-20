
const  conn=require("../db/index.js");
/* 引入时间中间件 */
const moment=require("moment");

// 导入加密的模块
const bcrypt = require('bcrypt');
// 定义一个 幂次
const saltRounds = 10    // 2^10

const showRegisterPage=(req,res)=>{
    res.render("./user/register.ejs",{});
};
const  showLoginPage=(req,res)=>{
    res.render("./user/login.ejs",{});
};

// const  register=(req,res)=>{
//     const  body=req.body;
//     console.log(body,88);
//     /* 服务器端判断用户信息 */
//     if(body.username.trim().length<=0||body.password.trim().length<=0||body.nickname.trim().length<=0){
//         return res.send({status: 501,msg: "请填写完整的用户信息",})
//     };

//     const  sql1="select  count(*) as  count  from  blog_users  where username=?";
//     conn.query(sql1,body.username,(err,result)=>{
//         if (err) return res.send({status: 502,msg: "用户名查重失败",})
//         if (result[0].count!==0) return res.send({ status: 503, msg: "请更换其他用户名后重新注册",})
//         // 如果获取数据成功，则直接返回成功的数据结果
//         body.ctime=moment().format('YYYY-MM-DD HH:mm:ss');
        
//         const sql2="insert  into  blog_users set ?";
//         conn.query(sql2,body,(err,result)=>{
//             if (err) return res.send({status: 504,msg: "用户名添加失败",});
//             if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败！', status: 505 })
//             res.send({msg:"用户新注册成功",status:200});
//         })
//     });
// };

/* 密码加密注册 */
const  register=(req,res)=>{
    const  body=req.body;
    console.log(body,88);
    /* 服务器端判断用户信息 */
    if(body.username.trim().length<=0||body.password.trim().length<=0||body.nickname.trim().length<=0){
        return res.send({status: 501,msg: "请填写完整的用户信息",})
    };

    const  sql1="select  count(*) as  count  from  blog_users  where username=?";
    conn.query(sql1,body.username,(err,result)=>{
        if (err) return res.send({status: 502,msg: "用户名查重失败",})
        if (result[0].count!==0) return res.send({ status: 503, msg: "请更换其他用户名后重新注册",})
        // 如果获取数据成功，则直接返回成功的数据结果
        body.ctime=moment().format('YYYY-MM-DD HH:mm:ss');

        // 对密码加密
        bcrypt.hash(body.password, saltRounds, (err, pwdCryped) => {
            console.log(pwdCryped);
            body.password=pwdCryped;
            const sql2="insert  into  blog_users set ?";
            conn.query(sql2,body,(err,result)=>{
                if (err) return res.send({status: 504,msg: "用户名添加失败",});
                if (result.affectedRows !== 1) return res.send({ msg: '注册新用户失败！', status: 505 })
                res.send({msg:"用户新注册成功",status:200});
            })
         })
    });
};

// const  login=(req,res)=>{
//     const  body=req.body;
//     const  sql1="select  *  from  blog_users where username=? and password=?";
//     conn.query(sql1,[body.username,body.password],(err,result)=>{
//         if (err) return res.send({status: 501,msg: "用户登录失败",});
//         if (result.length!=1) return res.send({status: 502,msg: "用户登录失败"});
//         // 将登录的用户保存到session中
//         req.session.user = result[0];
//         // 设置是否登录为true
//         req.session.islogin = true;
//         res.send({msg:"用户登录成功",status:200});
//     });
// };

/* 加密 */
const  login=(req,res)=>{
    const  body=req.body;
    const  sql1="select  *  from  blog_users where username=?";

    conn.query(sql1,[body.username],(err,result)=>{
        if (err) return res.send({status: 501,msg: "用户登录失败",});
        if (result.length!=1) return res.send({status: 502,msg: "用户登录失败"});

        bcrypt.compare(body.password, result[0].password, function(err, compireResult) {
            if (err) return res.send({ msg: '用户登录失败', status: 503 })
            if (!compireResult) return res.send({ msg: '用户登录失败', status: 504 })
            // 将登录的用户保存到session中
            req.session.user = result[0];
            // 设置是否登录为true
            req.session.islogin = true;
            res.send({msg:"用户登录成功",status:200});
        })
        
    });
};

const  logout=(req,res)=>{
    req.session.destroy(function(err){
        if(err) throw err;
        console.log('用户退出成功！');
        // 实现服务器端的跳转，这个对比于 客户端跳转
        res.redirect('/');
      });
}

module.exports={
    showRegisterPage,
    showLoginPage,
    register,
    login,
    logout
}