import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import User from '../app/models/Users'
import Product from '../app/models/Products'
import Category from '../app/models/Category'

import configDatabase from '../config/database'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize('postgresql://postgres:EzTezkBAyAAESGnCZLrnlGDyWIANTeXQ@junction.proxy.rlwy.net:32753/railway')
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:eUAvGpofKFyODDxSFDdQEhiJJnVRytun@junction.proxy.rlwy.net:16229',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
  }
}

export default new Database()
