const User = require('../models/User')
const { StatusCodes } = require('http-status-codes') //library installed from packaje.json
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {

  //mongoose .create() method save one or more documents to the database.
  // https://mongoosejs.com/docs/api.html#model_Model-create

  // {...req.body} : decomposition avec litteraux d'objet
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  // var profil = { prenom: 'Sarah', profilComplet: false };
  // var profilMisAJour = { nom: 'Dupont', profilComplet: true };
  // var fusion = { ...profil, ...profilMisAJour };
  // Object { prenom: 'Sarah', nom: 'Dupont', profilComplet: true };

  const user = await User.create({ ...req.body }) // password encrypte ds model User avec .pre middleware
  // .createJWT() is a method from the model User
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login,
}
