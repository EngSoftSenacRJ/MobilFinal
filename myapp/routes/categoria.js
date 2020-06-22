var express = require('express');
var router = express.Router();
var db = require("../database/index");

router.get("/", async (req, res, next) => {

    try {
        let sql = `SELECT * FROM tb_categoria_produto`;
        db.executeQuery(sql).then(r => {
            return res.status(200).json(r);
        });
    } catch (error) {
        next(error);
    }


});

module.exports = router;