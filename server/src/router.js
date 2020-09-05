import joiRouter from 'koa-joi-router'
import repository from './repository.js'
import mailer from './mailer.js'
const Joi = joiRouter.Joi

const router = joiRouter()
const { EMAIL_SUBJECT, EMAIL_FROM, EMAIL_TO } = process.env

router.get('/api/content', async (ctx) => {
  ctx.body = await repository.content()
})

router.post('/api/feedback', {
  validate: {
    type: 'json',
    body: {
      name: Joi.string(),
      email: Joi.string(),
      message: Joi.string()
    }
  }
}, async (ctx) => {
  await repository.feedback(ctx.request.body)
  const { name, email, message } = ctx.request.body
  await mailer({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: `${EMAIL_SUBJECT}: ${name}`,
    text: `From ${name} <${email}>,\n\n${message}`
  })
  ctx.status = 201
})

export default router
