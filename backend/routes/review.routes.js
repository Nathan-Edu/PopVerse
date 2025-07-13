const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const auth = require('../middlewares/auth.middleware');


router.post('/', auth, reviewController.createOrUpdateReview);

router.delete('/:contentId', auth, reviewController.deleteReview);

router.get('/:contentId', reviewController.getReviewsByContent);

module.exports = router;
