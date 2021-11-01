const passport = require('passport')

//ESTRATEGIES
const LocalStrategy = require('./strategies/local.strategy')

passport.use(LocalStrategy)
