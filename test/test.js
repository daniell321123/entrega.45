import assert from "node:assert"
import supertest from 'supertest'

const httpAgent = supertest.agent('http://localhost:8080')

describe('sistema de videojuegos', () => {

  beforeEach(async () => {
    await httpAgent.delete('/api/usuarios')
    await httpAgent.delete('/api/sesiones')
  })

  afterEach(async () => {
    await httpAgent.delete('/api/usuarios')
    await httpAgent.delete('/api/sesiones')
  })

  describe('subida de imagenes', () => {
    describe('si subo una imagen en formato jpeg', () => {
      it('se guarda en el servidor y devuelve 201', async () => {


        await httpAgent.post('/api/usuarios').send({
          "email": "marian@marian.com",
          "password": "abc123",
          "nombre": "marian",
          "rol": "admin"
        })

        await httpAgent.post('/api/sesiones').send({
          "email": "marian@marian.com",
          "password": "abc123"
        })

        const nombreArchivo = 'aliadin.jpeg'
        const rutaImagenDePrueba = `./test/resources/${nombreArchivo}`

        const { status, body } = await httpAgent.post('/api/avatares')
          .field('userid', 1)
          .attach('avatar', rutaImagenDePrueba)

        assert.strictEqual(status, 201)
        assert.ok(body.filename.endsWith(nombreArchivo))
      })
    })
  })
})