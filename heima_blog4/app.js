const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

/* 获取参数 */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));

/* 导入session中间件 */
const session = require('express-session');
// 启用 session 中间件
app.use(session({
    secret: '这是加密的秘钥', // 相当于是一个加密密钥，值可以是任意字符串
    resave: false, // 强制session保存到session store中
    saveUninitialized: false // 强制没有“初始化”的session保存到storage中
}));


app.engine("ejs", require("express-art-template")); //既支持原生也支持简版语法
app.set("view engine", "ejs");
app.set("views", "./views");

/* 静态托管资源文件 */
app.use("/node_modules", express.static("./node_modules"));

/* 导入路由模块 */
// const  router1=require("./router/index.js");
// app.use(router1);

// const  router2=require("./router/user.js");
// app.use(router2);

fs.readdir(path.join(__dirname, "./router"), (err, filenames) => {
    console.log(filenames, 55);
    filenames.forEach((fname) => {
         const router = require(path.join(__dirname, "./router", fname));
        //console.log(path.join(__dirname, "./router", fname));
         app.use(router);
    });
})

app.listen(1000,() => {
    console.log('server running at http://127.0.0.1:1000')
});