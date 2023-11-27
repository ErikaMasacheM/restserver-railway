const path = require('path');
const { response } = require("express");

const cargarArchivo = (req, res = response) => {
    let { archivo } = req.files;
    let nombreCortado = archivo.name.split('.')
    console.log(archivo);
    console.log(nombreCortado);

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = path.join(__dirname, '../uploads/', archivo.name);

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send(`File uploaded! ${uploadPath}`);
    });

}

module.exports = {
    cargarArchivo: cargarArchivo
}