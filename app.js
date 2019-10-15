const Koa = require('koa');

const app = new Koa();

const koaStatic = require('koa-static')
const path = require('path')

//引入抛出的路由文件夹
const router = require('./router'); //引入koa路由插件

const bodyparser = require('koa-bodyparser'); //引入post请求传过来的参数插件

//获取静态资源
const staticPath = koaStatic(path.join(process.cwd(),"public"))
app.use(staticPath)

app.use(router.routes()); //启动路由
app.use(router.allowedMethods())

app.use(bodyparser()); 

app.listen(3000,()=>{
   console.log('服务器启动成功')  
})