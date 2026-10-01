const express = require('express');
const dosageController = require('../controllers/dosageController');

const router = express.Router();

router.get('/fertilizer-table', dosageController.getFertilizerTable);
router.get('/pesticide-table', dosageController.getPesticideTable);
router.post('/fertilizer', dosageController.fertilizer);
router.post('/pesticide', dosageController.pesticide);

module.exports = router;
