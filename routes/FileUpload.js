const express = require("express");
const router = express.Router();

const { localFileUpload, imageUplaod, videoUplaod, imageSizeReducer } = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUplaod", imageUplaod);
router.post("/videoUplaod", videoUplaod);
router.post("/imageSizeReducer", imageSizeReducer);

module.exports = router;