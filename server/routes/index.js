const express = require('express');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const depHeadRouter = require('./depHeadRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/dephead', depHeadRouter)

module.exports = router;
