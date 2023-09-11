const express = require('express');
const teacherRouter = express.Router();
const teacherController = require('../controllers/teacherController');
const roleMiddleware = require('../middleware/roleMiddleware');

teacherRouter.get('/profile/:id', roleMiddleware('TEACHER'), teacherController.getTeacherProfile);
teacherRouter.put('/profile/:id', roleMiddleware('TEACHER'), teacherController.updateTeacherProfile);

teacherRouter.post('/load/:id', roleMiddleware('TEACHER'), teacherController.createLoad);
teacherRouter.put('/load/:id', roleMiddleware('TEACHER'), teacherController.updateLoad);
teacherRouter.delete('/load/:id', roleMiddleware('TEACHER'), teacherController.deleteLoad);
teacherRouter.get('/load/:id/:month', roleMiddleware('TEACHER'), teacherController.getLoads);
teacherRouter.get('/semestr/:id/:sem', teacherController.getSemesterLoads);
teacherRouter.get('/year/:id', teacherController.getYearLoads);

teacherRouter.get('/departments', roleMiddleware("TEACHER"), teacherController.getDepartments);
teacherRouter.get('/faculties', roleMiddleware("TEACHER"), teacherController.getFaculties);

module.exports = teacherRouter;
