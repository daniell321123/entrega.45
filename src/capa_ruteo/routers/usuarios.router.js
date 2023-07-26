import { Router } from 'express'
import { deleteAllUsuariosController, postUsuariosController } from '../controllers/usuarios.controller.js'
import { extraerCredenciales, soloAutenticados } from '../middlewares/auth.js'

export const usuariosRouter = Router()

usuariosRouter.post('/', postUsuariosController)
usuariosRouter.delete('/',
  // extraerCredenciales,
  // soloAutenticados,
  deleteAllUsuariosController)
