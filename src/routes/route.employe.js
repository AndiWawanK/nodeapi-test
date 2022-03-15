const router = require('express').Router();
const { employe } = require('../controllers');

const base_path = '/api/v1'

router.get(base_path + '/employe', employe.getEmploye);
router.get(base_path + '/employe/:id', employe.getEmployeById);
router.post(base_path + '/employe/add', employe.addEmploye);

module.exports = router;