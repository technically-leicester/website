import router from './src/router.js'
import koa from 'koa'
import cors from '@koa/cors'
import dotenv from 'dotenv'

dotenv.config()

const app = new koa()
app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(router.middleware())
app.listen(process.env.PORT)
