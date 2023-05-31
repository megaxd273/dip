const Router = require('express').Router;
const authController = require('../controllers/authController');


const router = new Router();

// router.post('/registration',
//     body('login').isLength({min:3, max:32}),
//     body('password').isLength({min:3, max:32}),
//     userController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
// router.get('/users' , userController.getUsers);authMiddleware

module.exports = router;