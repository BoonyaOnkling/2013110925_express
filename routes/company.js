var express = require('express');
var router = express.Router();
const companyController = require('../controllers/companyController')
const passportJWT = require('../middleware/passportJWT')
const checkAdmin = require('../middleware/checkAdmin')

router.get('/',[passportJWT.isLogin,checkAdmin.isAdmin],companyController.index);

router.delete('/:id',companyController.destory);

router.put('/:id',companyController.update);

router.post('/',companyController.insert);

module.exports = router;