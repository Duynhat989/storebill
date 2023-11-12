const express = require('express')
const controler = require('../controller/store.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/recognize',controler.recognize)
//--------------
module.exports = router;