// ************ Require's ************
const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/userAuth');

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/admin', userAuth, mainController.admin); 
router.get('/results', mainController.search); 

module.exports = router;
