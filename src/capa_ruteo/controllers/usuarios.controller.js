import { usuariosService } from '../../capa_negocio/services/usuarios.service.js'
import { criptografiador } from '../../capa_transversal/services/criptografia.service.js'

export async function postUsuariosController(req, res, next) {
    const datosUsuario = req.body

    try {
        const usuarioGuardado = await usuariosService.registrar(datosUsuario)

        const todosLosUsuarios = await usuariosService.obtenerTodos()
        req['io'].sockets.emit('usuarios', todosLosUsuarios)

        const token = criptografiador.generarToken(usuarioGuardado)
        res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })

        res.status(201).json(usuarioGuardado)
    } catch (error) {
        next(error)
    }
}

export async function deleteAllUsuariosController(req, res, next) {
    try {
        await usuariosService.borrarTodos()

        const todosLosUsuarios = await usuariosService.obtenerTodos()
        req['io'].sockets.emit('usuarios', todosLosUsuarios)

        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}
