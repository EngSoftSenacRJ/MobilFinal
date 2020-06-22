var express = require('express');
var router = express.Router();
var db = require("../database/index");


router.post("/", async (req, res, next) => {
    let { latitude, longitude, categoria, marca, produto, distancia } = req.body;

    let sql = `SELECT *, distanciaEntreCoordenadas(${latitude}, ${longitude},CONVERT(latitude,decimal(19,6)), CONVERT(longitude,decimal(19,6)) ) as distancia FROM pesquisa WHERE 1=1 `

    if (categoria) {
        sql += ` AND  categoria = '${categoria}'`;
    }

    if (marca) {
        sql += ` AND marca = '${marca}' `;
    }

    if (produto) {
        sql += ` AND  nome like '%${produto}%' `;
    }

    if (distancia) {
        sql += ` AND distanciaEntreCoordenadas(${latitude}, ${longitude} ,CONVERT(latitude,decimal(19,6)), CONVERT(longitude,decimal(19,6)) ) <= ${distancia} `;
    }


    db.executeQuery(sql).then(r => {

        return res.status(200).json(r);
    });



});

module.exports = router;