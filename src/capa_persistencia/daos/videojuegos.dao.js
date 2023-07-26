import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schemaVideojuegos = new mongoose.Schema({
    nombre: { type: String, required: true },
    genero: { type: String, required: true },
    plataforma: { type: String, required: true },
}, { versionKey: false })

schemaVideojuegos.plugin(mongoosePaginate)

const vjModel = mongoose.model('videojuegos', schemaVideojuegos)

class VideojuegosManager {
    #videojuegosDb
    constructor() {
        this.#videojuegosDb = vjModel
    }

    async guardar(datosVJ) {
        let vjGuardado = await this.#videojuegosDb.create(datosVJ)
        vjGuardado = JSON.parse(JSON.stringify(vjGuardado))
        return vjGuardado
    }

    async obtenerTodos(/*{ page = 1, limit = 10 }*/) {
        // @ts-ignore
        const vjs = await this.#videojuegosDb.find().lean()
        // const vjs = await this.#videojuegosDb.paginate({ page, limit, lean: true })
        return vjs
    }

    async obtenerSegunId(id) {
        const vj = await this.#videojuegosDb.findById(id).lean()
        return vj
    }
}

export const videojuegosManager = new VideojuegosManager()