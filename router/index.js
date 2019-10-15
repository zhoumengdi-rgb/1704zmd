const router = require('koa-router')(); //引入koa路由

const query = require('../db/query'); //引入sql语句的承诺

//查询成员列表 sql语法: select * from userlist where idCard=?
router.get('/api/userlist',async ctx =>{
    //成功then 失败catch
    let data = await query('select * from userlist');

    ctx.body = data; //展示想要的
})

//添加成员信息 sql语法:insert into userlist (name,age,phone,sex,address) values (?,?,?,?,?)
router.post('/api/add',async ctx=>{
    //解构拿出键值(表是什么就是什么)
    let {name,age,phone,sex,address,idCard} = ctx.request.body;
    //sql语句
    let sql = 'insert into userlist (name,age,phone,sex,address,idCard) values (?,?,?,?,?,?)';
    //如果里面少了任何一个 就提示参数不完整
    if(!name || !age || !phone || !sex || !address || !idCard){
       return ctx.body = {code:2,msg:"缺少参数"} 
    }
    //查询此人是否添加
    let isData = await query('select * from userlist where idCard=?',[idCard]); //[]
    if(isData.data.length){
        //存在 
        return ctx.body = {code:3,msg:"此人已经存在"} 
    }else{
        //不存在
        let data = await query(sql,[name,age,phone,sex,address,idCard]); //调用query(sql语句)
        //添加成功
        if(data.msg === "success"){
            ctx.body = {code:1,msg:"添加成功"}
        }else{
        //添加失败
            ctx.body = {code:0,msg:"添加失败"}
        }
    }

})

//删除   sql语法: delete from userlist where id=?
router.get('/api/del',async ctx =>{
    let {id} = ctx.query; //获取前端的id
    let sql = 'delete from userlist where id=?'; //sql删除语法
    let res = await query(sql,[id]); //调query传参 (语句,要删的)
    if(res.msg === "error"){
        ctx.body = {code:0,msg:"删除失败"};
    }else{
        ctx.body = {code:1,msg:"删除成功"};
    }
})

//更改  sql语法(没有from):update from userlist u set u.name=?,.u.age=? ...
router.post('/api/update',async ctx =>{
    //获取要修改的前端的表
    let {name,age,phone,sex,address,idCard,id} = ctx.request.body;
    //判断
    if(!name || !age || !phone || !sex || !address || !idCard || !id){
        return ctx.body = {code:2,msg:"缺少参数"} 
     }
    //修改的sql语句
    let sql = 'update userlist u set u.name=?,u.age=?,u.phone=?,u.sex=?,u.address=?,u.idCard=? where id=?';
    let res = await query(sql,[name,age,phone,sex,address,idCard,id]);
    if(res.msg === "error"){
        ctx.body = {code:0,msg:"修改失败"}
    }else{
        ctx.body = {code:0,msg:"修改成功"}
    }
})

module.exports = router;