const express = require('express');
const multer = require('multer');
const path = require('path');
const diseaseController = require('../controllers/diseaseController');

const upload = multer({
  dest: path.join(__dirname, '..', '..', 'uploads'),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB max
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Please choose an image file (JPG or PNG).'));
    }
    cb(null, true);
  },
});

const router = express.Router();

router.get('/', diseaseController.listDiseases);
router.post('/scan', upload.single('photo'), diseaseController.scan);

module.exports = router;
