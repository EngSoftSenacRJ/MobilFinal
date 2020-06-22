//var winston = require('../config/winston');
/*function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF + "  " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
}*/
module.exports = (err, req, res, next) => {
   // winston.error(`ERROR: ${err.status || 500} -${dataAtualFormatada()}  - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.stack}`);
    res.status(err.status || 500);
    res.send({
        error: {
            title: "Oops!",
            message: "Encontramos uma falha ao tentar realizar esta operação no momento.",
            trace: err.stack
        }
    });

};