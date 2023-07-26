import { videojuegosService } from '../../capa_negocio/services/videojuegos.service.js'

export async function postVideojuegosController(req, res, next) {
    try {
        const videojuego = await videojuegosService.registrar(req.body)

        req['io'].sockets.emit('videojuegos', await videojuegosService.obtenerTodos())

        res.json(videojuego)
    } catch (error) {
        next(error)
    }
}
