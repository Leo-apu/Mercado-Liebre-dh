const fs = require('fs');
const path = require('path');
const pathlog = path.join(__dirname, '../logs/userLogs.txt');

const userlogsMiddleware = (req, res, next) => {
    const { method, url } = req;
    const log = `El usuario ingreso a la ruta: Metodo: ${method} - Ruta: ${url}\n`;

    fs.appendFileSync(pathlog, log);

    next();
}

module.exports = userlogsMiddleware;