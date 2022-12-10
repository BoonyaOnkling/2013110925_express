var express = require('express');
var router = express.Router();
const staffController = require('../controllers/staffController')

router.get('/',staffController.index);

/*การรับid (paramiter) */
router.get('/:id',staffController.show);

router.delete('/:id',staffController.destory);

router.put('/:id',staffController.update);

router.post('/',staffController.insert);

module.exports = router;