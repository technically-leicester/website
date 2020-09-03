import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const database = knex({
  client: process.env.DATABASE_CLIENT,
  connection: {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
  }
})

export default database 
