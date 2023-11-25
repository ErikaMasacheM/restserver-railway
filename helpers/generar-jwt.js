const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.PUBLIC_KEY, { expiresIn: '8760h' }, 
        (err, token) => {
            if(err){
                console.log(err);
                reject({auth: false, mensaje:'No se pudo crear el JWT.'});
            }
            resolve(token);
        });
    });
}

module.exports = {
    generarJWT: generarJWT,
}