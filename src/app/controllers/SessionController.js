import * as Yup from 'yup'
import User from '../models/Users'

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
    })
  }
}

export default new SessionController()