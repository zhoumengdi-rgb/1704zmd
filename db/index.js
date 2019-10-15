const mysql = require('mysql')

//与数据库链接
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port:"3306",
    database:"1704zmd"
})

connection.connect((error) =>{
    if(error){
        console.log("数据库连接失败")
    }else{
        console.log("数据库链接成功")
    }
})
module.exports = connection; //抛出