const express = require('express');
const historyController = require('../controllers/historyController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireAuth);
router.get('/', historyController.list);
router.post('/', historyController.add);
router.delete('/', historyController.clear);

module.exports = router;
