import { usuariosManager } from '../../capa_persistencia/daos/usuarios.dao.js'
import { criptografiador } from '../../capa_transversal/services/criptografia.service.js'
import { emailService } from '../../capa_transversal/services/email.service.js'
import { Usuario } from '../models/entidades/Usuario.js'

class UsuariosService {
  constructor() { }

  async registrar(datosUsuario) {
    datosUsuario.password = criptografiador.hashear(datosUsuario.password)
    const usuario = new Usuario(datosUsuario)
    const usuarioGuardado = await usuariosManager.guardar(usuario.datos())
    await emailService.send(usuario.email, `te damos la bienvenida, ${usuario.nombre}!`)
    return usuarioGuardado
  }

  async obtenerTodos() {
    const usuarios = await usuariosManager.obtenerTodos()
    return usuarios
  }

  async borrarTodos() {
    await usuariosManager.borrarTodos()
  }

}


export const usuariosService = new UsuariosService() 