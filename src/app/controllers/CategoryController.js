import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/Users'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { name } = request.body

    const { filename: path } = request.file

    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    })

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exixts' })
    }

    const { id } = await Category.create({ name, path })

    return response.json({ name, id })
  }

  catch(err) {
    console.log(err)
  }

  async index(request, response) {
    const category = await Category.findAll()

    return response.json(category)
  }
}

export default new CategoryController()
