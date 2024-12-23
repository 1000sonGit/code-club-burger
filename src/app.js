import express from 'express'
import routes from './routes'
import { resolve } from 'path'
import cors from 'cors'

import './database'

const corsOptions = {
  origin: 'https://code-burger-interface-three.vercel.app',
  credentials: true,
}

class App {
  constructor() {
    this.app = express()
    this.app.use(cors(corsOptions))

    this.middlewares()
    this.routes()    
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(
      '/product-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )

    this.app.use(
      '/category-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )
  }

  routes() {
    this.app.use(routes)
  }
}

module.exports = new App().app
