// routes/stats-routes/stats.js

const express = require('express');
const {getInstructorStats} = require('../../controllers/stats-controller/stats-controller');
const router = express.Router();

// Define the route for getting statistics
router.get('/statistics', getInstructorStats);

module.exports = router;
