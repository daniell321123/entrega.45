import { sesionesService } from '../../capa_negocio/services/sesiones.service.js'

export async function postSesionesController(req, res, next) {
    try {
        const token = await sesionesService.login(req.body)
        res.cookie('authToken', token, { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

export async function deleteSesionesController(req, res, next) {
    res.clearCookie('authToken', { httpOnly: true, signed: true, maxAge: 1000 * 60 * 60 * 24 })
    res.sendStatus(204)
}
