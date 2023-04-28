const Router = require('express').Router;
const userController = require('../controllers/userController');
const {body} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new Router();

router.post('/registration',
    body('login').isLength({min:3, max:32}),
    body('password').isLength({min:3, max:32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users' ,authMiddleware, userController.getUsers);

module.exports = router;