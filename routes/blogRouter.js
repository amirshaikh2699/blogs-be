const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");

router.post("/create",blogController.create);
router.get("/read",blogController.read);
router.put("/update",blogController.update);
router.post("/delete",blogController.delete);

module.exports = router;