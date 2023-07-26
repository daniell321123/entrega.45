import { Router } from 'express'
import { videojuegosManager } from '../../capa_persistencia/daos/videojuegos.dao.js'
import { usuariosManager } from '../../capa_persistencia/daos/usuarios.dao.js'
import { extraerCredenciales, soloAutenticados } from '../middlewares/auth.js'
import { manejoDeErroresWeb } from '../middlewares/manejoDeErrores.js'

export const routerVistas = Router()

routerVistas.get('/', (req, res, next) => {
    res.redirect('/videojuegos')
})

routerVistas.get('/videojuegos', extraerCredenciales, soloAutenticados, async (req, res, next) => {
    try {
        const videojuegos = await videojuegosManager.obtenerTodos()

        res.render('videojuegos', {
            pageTitle: 'Videojuegos',
            hayVideojuegos: videojuegos.length > 0,
            videojuegos
        })
    } catch (error) {
        next(error)
    }
})

routerVistas.get('/usuarios', async (req, res, next) => {
    try {
        const usuarios = await usuariosManager.obtenerTodos()

        res.render('usuarios', {
            pageTitle: 'Usuarios',
            hayUsuarios: usuarios.length > 0,
            usuarios
        })
    } catch (error) {
        next(error)
    }
})

routerVistas.get('/register', async (req, res, next) => {
    res.render('register', {
        pageTitle: 'Registro de usuarios',
    })
})


routerVistas.get('/login', async (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login'
    })
})

routerVistas.use(manejoDeErroresWeb)