const connect = require('./index')

const query = (sql,params=[]) =>{
    return new Promise((resolve,reject) =>{
        connect.query(sql,params,(error,data) =>{
            if(error){ //如果错误
                reject({msg:'error',error})
            }else{ //否则
                resolve({msg:"success",data})  
            }
        })
    })
}
module.exports = query;