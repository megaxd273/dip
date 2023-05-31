const { body, param, validationResult } = require('express-validator');
const Router = require('express').Router;
const adminController = require('../controllers/adminController');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();

router.get('/users', roleMiddleware('ADMIN'), adminController.getUserList);

router.delete(
  '/users/:id',
  roleMiddleware('ADMIN'),
  param('id').notEmpty().withMessage('ID пользователя является обязательным полем'),
  adminController.deleteUser
);

router.post(
  '/department-heads',
  roleMiddleware('ADMIN'),
  body('login').notEmpty().withMessage('Login главы отдела является обязательным полем'),
  body('departmentId').notEmpty().withMessage('ID отдела является обязательным полем'),
  adminController.createDepartmentHead
);

router.put(
  '/department-heads/reset-password/:id',
  roleMiddleware('ADMIN'),
  param('id').notEmpty().withMessage('ID главы отдела является обязательным полем'),
  adminController.updateDepartmentHeadPassword
);

router.post(
  '/departments',
  roleMiddleware('ADMIN'),
  body('name').notEmpty().withMessage('Название отдела является обязательным полем'),
  adminController.createDepartment
);

router.get('/departments',roleMiddleware('ADMIN'), adminController.getDepartments);

router.get(
  '/departments/:id',
  roleMiddleware('ADMIN'),
  param('id').notEmpty().withMessage('ID отдела является обязательным полем'),
  adminController.getDepartment
);

router.put(
  '/departments/:id',
  roleMiddleware('ADMIN'),
  param('id').notEmpty().withMessage('ID отдела является обязательным полем'),
  body('name').notEmpty().withMessage('Название отдела является обязательным полем'),
  adminController.updateDepartment
);

router.delete(
  '/departments/:id',
  roleMiddleware('ADMIN'),
  param('id').notEmpty().withMessage('ID отдела является обязательным полем'),
  adminController.deleteDepartment
);

router.post(
  '/faculties',
  roleMiddleware('ADMIN'),
  body('name').notEmpty().withMessage('Название факультета является обязательным полем'),
  adminController.createFaculty
);

router.get('/faculties', adminController.getFaculties);
router.get('/departments-by-faculty/:id', adminController.getByFaculty)
router.get(
  '/faculties/:id',
  param('id').notEmpty().withMessage('ID факультета является обязательным полем'),
  adminController.getFaculty
);

router.put(
  '/faculties/:id',
  roleMiddleware('ADMIN'),
  param('id').notEmpty().withMessage('ID факультета является обязательным полем'),
  body('name').notEmpty().withMessage('Название факультета является обязательным полем'),
  adminController.updateFaculty
);

router.delete(
  '/faculties/:id',
  roleMiddleware('ADMIN'),
  param('id').notEmpty().withMessage('ID факультета является обязательным полем'),
  adminController.deleteFaculty
);

module.exports = router;

