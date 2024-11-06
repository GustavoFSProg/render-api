import { PrismaClient } from '@prisma/client'
import md5 from 'md5'
import { generateToken } from './token'

const prisma = new PrismaClient()

async function CreateUser(req, res) {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET)),
      },
    })

    return res.status(201).send({ mensagem: 'User criado com sucesso!', user })
  } catch (error) {
    return res.status(400).send({ mensagem: 'ERROR!', error })
  }
}

async function getUsers(req, res) {
  try {
    const data = await prisma.user.findMany()

    return res.status(201).send(data)
  } catch (error) {
    return res.status(400).send({ mensagem: 'ERROR!', error })
  }
}

async function Login(req, res) {
  try {
    const { email, password } = req.body

    const dados = { email, password }

    const data = await prisma.user.findFirst({
      where: {
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET)),
      },
    })

    if (!data) {
      return res.send({ msg: 'Erro no login!' })
    }

    const Token = await generateToken(dados)

    return res.status(201).send({ msg: 'Login sucesso!', data, Token })
  } catch (error) {
    return res.status(400).send({ mensagem: 'ERROR!', error })
  }
}

export default { getUsers, Login, CreateUser }
