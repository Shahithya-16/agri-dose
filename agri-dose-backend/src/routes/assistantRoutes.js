const express = require('express');
const assistantController = require('../controllers/assistantController');

const router = express.Router();

router.post('/ask', assistantController.ask);

module.exports = router;
