const connect = require('./index')

const query = (sql) =>{
    return new Promise((resolve,reject) =>{
        connect.query(sql,(error,data) =>{
            if(error){ //如果错误
                reject(error)
            }else{ //否则
                resolve(data)  
            }
        })
    })
}
module.exports = query;