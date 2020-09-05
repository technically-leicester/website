import router from './src/router.js'
import koa from 'koa'
import accesslog from 'koa-accesslog'
import dotenv from 'dotenv'

dotenv.config()

const app = new koa()
app.use(router.middleware())
app.use(accesslog())
app.listen(process.env.PORT)
