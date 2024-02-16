const express = require('express');
const routerMovie = require('./movie.router');
const routerGenre = require('./genre.router');
const routerDirector = require('./director.router');
const routerActor = require('./actor.router');
const router = express.Router();

// colocar las rutas aquí

router.use('/movies', routerMovie)
router.use('/genres', routerGenre)
router.use('/directors', routerDirector)
router.use('/actors', routerActor)


module.exports = router;