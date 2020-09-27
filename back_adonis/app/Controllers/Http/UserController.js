'use strict'
const Database = use("Database")
const User = use("App/Models/User");

const { validate } = use('Validator')


class UserController {
  async index({ request, response, view }) {
    return User.all();
  }

  async store({ request, session, response }) {
    const { username, email, password } = request.all();
    const rules = {
      username: 'required',
      email: 'required',
      password: 'required'
    }
    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return validation.messages();
    }
    else {
      try{
      var a = await User.findOrCreate({ username, email, password })
      console.log(a);
      } catch(e){
        if(e.errno == 19)
        return {'erro':'Usuário já existe'}
      }

    }
  }

  async update({ params, request, response }) {
  }
  async destroy({ params, request, response }) {
  }
} module.exports = UserController
