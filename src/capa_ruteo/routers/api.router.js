import { Router } from 'express'
import { videojuegosRouter } from './videojuegos.router.js'
import { usuariosRouter } from './usuarios.router.js'
import { sesionesRouter } from './sesiones.router.js'
import { manejoDeErroresRest } from '../middlewares/manejoDeErrores.js'
import { avataresRouter } from './avatares.router.js'

export const routerApi = Router()

routerApi.use('/avatares', avataresRouter)
routerApi.use('/videojuegos', videojuegosRouter)
routerApi.use('/usuarios', usuariosRouter)
routerApi.use('/sesiones', sesionesRouter)

routerApi.use(manejoDeErroresRest)
