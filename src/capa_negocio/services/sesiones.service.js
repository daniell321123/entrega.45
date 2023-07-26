import { usuariosManager } from '../../capa_persistencia/daos/usuarios.dao.js'
import { criptografiador } from '../../capa_transversal/services/criptografia.service.js'

class SesionesService {
  constructor() { }

  async login(credenciales) {
    const usuario = await usuariosManager.obtenerSegunEmail(credenciales.email)
    if (!criptografiador.comparar(credenciales.password, usuario.password)) {
      throw new Error('AUTHENTICATION ERROR')
    }
    const token = criptografiador.generarToken(usuario)
    return token
  }
}

export const sesionesService = new SesionesService() 