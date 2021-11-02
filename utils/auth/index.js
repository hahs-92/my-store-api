const passport = require('passport')

//ESTRATEGIES
const LocalStrategy = require('./strategies/local.strategy')
const JwtStrategy = require('./strategies/jwt.strategy')

passport.use(LocalStrategy) // login
passport.use(JwtStrategy) // proteger rutas
