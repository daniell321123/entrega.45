import { videojuegosManager } from '../../capa_persistencia/daos/videojuegos.dao.js'
import { Videojuego } from '../models/entidades/Videojuego.js'

class VideojuegosService {
  constructor() { }

  async registrar(datosVJ) {
    const vj = new Videojuego(datosVJ)
    const guardado = await videojuegosManager.guardar(vj.datos())
  }

  async obtenerTodos() {
    return await videojuegosManager.obtenerTodos()
  }
}

export const videojuegosService = new VideojuegosService() 