import joi from 'koa-joi-router'
import repository from './repository.js'

const router = joi()

router.get('/', async (ctx) => {
  ctx.body = await repository.content()
})

export default router
