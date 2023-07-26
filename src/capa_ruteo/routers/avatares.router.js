import { Router } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './avatares')
  },

  filename: function (req, file, cb) {
    const nombreParaGuardarElArchivo = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname
    cb(null, nombreParaGuardarElArchivo)
  }
})

const extractor = multer({ storage })
const extraerFoto = extractor.single('avatar')

export const avataresRouter = Router()

avataresRouter.post('/', extraerFoto, (req, res, next) => {
  try {
    // console.log(req.body)
    // console.log(req.file)
    res.status(201).json(req.file)
  } catch (error) {
    next(error)
  }
})
