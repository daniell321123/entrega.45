import { Router } from 'express'
import { postVideojuegosController } from '../controllers/videojuegos.controller.js'
import { extraerCredenciales, soloAutenticados } from '../middlewares/auth.js'

export const videojuegosRouter = Router()

videojuegosRouter.post('/', extraerCredenciales, soloAutenticados, postVideojuegosController)
