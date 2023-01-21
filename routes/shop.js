var express = require('express');
var router = express.Router();
const shopController = require('../controllers/shopController');
const { body } = require('express-validator');


router.get('/',shopController.index);
router.get('/menu',shopController.menu);
router.get('/:id',shopController.show);

router.post('/',[
    body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อสุกด้วย"),
    body('location').not().isEmpty().withMessage("กรุณาป้อนที่อยู่"),
    body('location.lat').isInt().withMessage("กรุณาระบุเป็นตัวเลข"),
    body('location.lgn').isInt().withMessage("กรุณาระบุเป็นตัวเลข"),
],shopController.insert);


module.exports = router;