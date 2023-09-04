import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.FLOAT,
        category: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://localhost:3000/product-file/${this.path}`
          },
        },
      },
      {
        sequelize,
      },
    )
  }
}

export default Product