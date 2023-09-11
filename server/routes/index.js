const express = require('express');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const depHeadRouter = require('./depHeadRouter');
const teacherRouter = require('./teacherRouter');
const methodistRouter = require('./methodistRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/dephead', depHeadRouter)
router.use('/teacher', teacherRouter)
router.use('/methodist', methodistRouter)

module.exports = router;
