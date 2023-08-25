
const express = require('express');
const router = express.Router();
const TournamentController = require('../controllers/tournamentController');
const AuthController = require('../controllers/authController');

const checkAuthorization = require('../middleware');

router.post('/add/:tournamentID', checkAuthorization, TournamentController.addUser);
router.post('/check/:tournamentID', checkAuthorization, TournamentController.checkUser);

module.exports = router;