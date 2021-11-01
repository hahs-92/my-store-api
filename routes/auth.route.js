const express = require('express')
const passport = require('passport')

const router = express.Router();


router.post('/login',
  passport.authenticate('local', { session: false}),
  async (req, res, next) => {
    try {
      res.json(req.user) //EL USER ES EL QUE RETORNA LA ESTRATEGIA DE PASSPORT
    } catch (error) {
      next(error);
    }
  }
)


module.exports = router;
