const express = require("express");
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload,
} = require("../controllers/bootcamps");

// include other resource routers
const courseRouter = require('./courses');
const advancedResults = require("../middleware/advancedResult");
const Bootcamp = require("../models/Bootcamp");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)

router
    .route("/")
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps) // note middleware
    .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
    .route("/:id")
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

router
    .route("/radius/:zipcode/:distance")
    .get(getBootcampsInRadius);

router
    .route("/:id/photo")
    .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

module.exports = router;
