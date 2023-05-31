const express = require('express');
const depHeadRouter = express.Router();
const departmentHeadController = require('../controllers/departmentHeadController');
const roleMiddleware = require('../middleware/roleMiddleware');

depHeadRouter.get('/teachers', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.getTeachers);

depHeadRouter.post('/teachers', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.createTeacher);

depHeadRouter.put('/teachers/:id', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.updateTeacherPassword);

depHeadRouter.delete('/teachers/:id', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.deleteTeacher);

depHeadRouter.get('/methodists', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.getMethodists);

depHeadRouter.post('/methodists', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.createMethodist);

depHeadRouter.put('/methodists/:id', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.updateMethodistPassword);

depHeadRouter.delete('/methodists/:id', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.deleteMethodist);

depHeadRouter.get('/profile/:id', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.getProfile);

depHeadRouter.put('/profile/:id', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.updateProfile);

depHeadRouter.get('/departments', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.getDepartments);
depHeadRouter.get('/faculties', roleMiddleware("DEPARTMENT_HEAD"), departmentHeadController.getFaculties);


module.exports = depHeadRouter;
