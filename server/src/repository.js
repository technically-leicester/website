import database from '../database.js'

const content = async () => {
  const results = await database.column(
    'headline',
    'content',
    { contentHeading: 'content_heading' },
    { feedbackHeading: 'feedback_heading' },
    { feedbackPrivacy: 'feedback_privacy' }
  ).select().table('content')
  if (results.length > 0) {
    return results[0]
  }
}

const feedback = async ({ name, email, message }) => {
  await database('feedback').insert({
    name,
    email,
    message,
    created_on: database.fn.now()
  })
}

export default { content, feedback }
