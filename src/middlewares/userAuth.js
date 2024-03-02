const fs = require('fs');
const path = require('path');
const pathlog = path.join(__dirname, '../logs/userLogs.txt');

const authorizeAdmin = (req, res, next) => {
    const authorizedUsers = ['Ada', 'Greta', 'Vim', 'Tim'];
    const user = req.query.user;
    console.log(`user: ${user}`);
    if (authorizedUsers.includes(user)) {
        //fs.appendFileSync(pathlog, `Hola Admin :  ${user}\n`);
        next(); 
    } else {
        res.status(403).send('No tienes los privilegios para ingresar');
        /* fs.appendFileSync(pathlog, `No tienes los privilegios para ingresar\n`);
        next(); */
    }
}

module.exports = authorizeAdmin;