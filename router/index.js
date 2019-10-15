const router = require('koa-router')(); //引入koa路由

const query = require('../db/query'); //引入sql语句的承诺

router.get('/api/userlist',async ctx =>{
    //成功then 失败catch
    let data = await query('select * from userlist');

    ctx.body = data;
})

module.exports = router;