import * as Yup from 'yup'
import User from '../models/Users'
import authConfig from '../../config/auth'
import jwt from 'jsonwebtoken'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    const userEmailOrPasswordIncorrect = () => {
      return response
        .status(400)
        .json({ error: 'Make sure yout password ou email are correct' })
    }

    if (!(await schema.isValid(request.body))) userEmailOrPasswordIncorrect()

    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) userEmailOrPasswordIncorrect()

    if (!(await user.checkpassword(password))) userEmailOrPasswordIncorrect()

    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
