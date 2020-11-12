const express = require('express');
const router = express.Router();

const asyncMiddle = require('../middleware/asyncMiddle');
const secureMiddle = require('../middleware/secureMiddle');
const auth = require('../middleware/auth');

const AdminController = require('../controllers/AdminController');

router.get('/schema/test_schema', secureMiddle, asyncMiddle(AdminController.getTestSchemaSchemaPaths));

module.exports = router;