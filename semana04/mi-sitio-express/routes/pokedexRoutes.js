const express = require("express");
const router = express.Router();
const pokedexController = require("../controllers/pokedexController");

router.get("/", pokedexController.list);
router.post("/", pokedexController.create);

module.exports = router;
