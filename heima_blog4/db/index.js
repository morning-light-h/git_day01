/* 连接数据库 */
const  mysql=require("mysql");
const  conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"node_001",
    multipleStatements:true
});
module.exports=conn;