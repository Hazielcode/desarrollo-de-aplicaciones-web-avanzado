const express = require("express");
const router = express.Router();
const gravastarController = require("../controllers/gravastarController");

router.get("/", gravastarController.list);
router.post("/", gravastarController.create);

module.exports = router;
