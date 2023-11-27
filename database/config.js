
const mongoose = require('mongoose');

const dbconnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB, {
        });
        console.log('Base mongo online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbconnection: dbconnection
}