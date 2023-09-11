const express = require('express');
const methodistRouter = express.Router();
const methodistController = require('../controllers/methodistController');
const roleMiddleware = require('../middleware/roleMiddleware');

methodistRouter.get('/teachers', roleMiddleware("METHODIST"), methodistController.getTeachers);

methodistRouter.post('/contracts/:teacherId', roleMiddleware("METHODIST"), methodistController.createContract);
methodistRouter.delete('/contracts/:contractId', roleMiddleware("METHODIST"), methodistController.deleteContract);
methodistRouter.put('/contracts/:contractId', roleMiddleware("METHODIST"), methodistController.updateContract);
methodistRouter.get('/contracts/:teacherId', roleMiddleware("METHODIST"), methodistController.getContracts);

methodistRouter.post('/addendums/:contractId', roleMiddleware("METHODIST"), methodistController.createAddendum);
methodistRouter.delete('/addendums/:addendumId', roleMiddleware("METHODIST"), methodistController.deleteAddendum);
methodistRouter.put('/addendums/:addendumId', roleMiddleware("METHODIST"), methodistController.updateAddendum);
methodistRouter.get('/addendums/:contractId', roleMiddleware("METHODIST"), methodistController.getAddendum);

methodistRouter.get('/contract-print/:id/:contractId', roleMiddleware("METHODIST"), methodistController.printContract);
methodistRouter.get('/addendum-print/:id', roleMiddleware("METHODIST"), methodistController.printAddendum);

methodistRouter.get('/statistics', roleMiddleware("METHODIST"), methodistController.getStatistics);


module.exports = methodistRouter;