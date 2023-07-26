import mongoose from 'mongoose'

const schemaUsuarios = new mongoose.Schema({
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    rol: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { versionKey: false })

const usuariosModel = mongoose.model('usuarios', schemaUsuarios)

class UsuariosManager {
    #usuariosDb
    constructor() {
        this.#usuariosDb = usuariosModel
    }

    async guardar(datosUsuario) {
        let usuarioGuardado = await this.#usuariosDb.create(datosUsuario)
        usuarioGuardado = JSON.parse(JSON.stringify(usuarioGuardado))
        return usuarioGuardado
    }

    async obtenerTodos() {
        return await this.#usuariosDb.find().lean()
    }

    async borrarTodos() {
        return await this.#usuariosDb.deleteMany({})
    }

    async obtenerSegunId(id) {
        const usuario = await this.#usuariosDb.findById(id).lean()
        if (!usuario) throw new Error('NOT FOUND')
        return usuario
    }

    async obtenerSegunEmail(email) {
        const usuario = await this.#usuariosDb.findOne({ email }).lean()
        if (!usuario) throw new Error('NOT FOUND')
        return usuario
    }
}

export const usuariosManager = new UsuariosManager()