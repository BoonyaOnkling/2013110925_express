var express = require('express');
var router = express.Router();
const companyController = require('../controllers/companyController')

router.get('/',companyController.index);

router.delete('/:id',companyController.destory);

router.put('/:id',companyController.update);

router.post('/',companyController.insert);

module.exports = router;