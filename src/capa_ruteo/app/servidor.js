import express from 'express'
import { PORT } from '../../config/servidor.config.js'
import { engine } from 'express-handlebars'
import { routerApi } from '../routers/api.router.js'
import { routerVistas } from '../routers/views.router.js'
import { conectar } from '../../capa_persistencia/database/mongoose.js'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import { COOKIE_SECRET } from '../../config/auth.config.js'
import { extraerCredenciales, soloAutenticados } from '../middlewares/auth.js'

await conectar()

const app = express()
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto ${PORT}`)
})

const io = new Server(server)

io.on('connection', async socket => {
    console.log('cliente nuevo conectado')
})

app.use(cookieParser(COOKIE_SECRET))

app.use((req, res, next) => {
    req['io'] = io
    next()
})

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))

const isAdmin = true
app.use('/api/avatares',
    // (req, res, next) => { if (isAdmin) { console.log('admin mirando fotos'); next() } },
    extraerCredenciales, soloAutenticados,
    express.static('./avatares'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routerApi)
app.use('/', routerVistas)