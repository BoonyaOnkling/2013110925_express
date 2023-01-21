var express = require('express');
var router = express.Router();
const staffController = require('../controllers/staffController');
const { body } = require('express-validator');

router.get('/',staffController.index);

/*การรับid (paramiter) */
router.get('/:id',staffController.show);

router.delete('/:id',staffController.destory);

router.put('/:id',staffController.update);

router.post('/',[
    body('name').not().isEmpty().withMessage("กรุณาป้อนชื่อสุกด้วย"),
    body('salary').not().isEmpty().withMessage("กรุณาระบุเงินเดือน")
    .isInt().withMessage("ระบุเป็นตัวเลข"),
],staffController.insert);

module.exports = router;