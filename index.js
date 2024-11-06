import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userController from './src/userController'

dotenv.config()

const { PORT } = process.env

const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Api Running: ${PORT}`)
})

app.get('/', (req, res) => {
  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
  return res.status(200).send({ msg: `Api Running: ` })
})

// biome-ignore lint/correctness/noUnreachable: <explanation>
app.post('/create-user', userController.CreateUser)
app.get('/get-users', userController.getUsers)
app.post('/login', userController.Login)

export default app
