const mongoose = require('mongoose');


const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true
        })

        console.log("Base de datos online")

    } catch (error) {
        throw new Error('error en la base de datos')
        console.log(error)
    }
}



module.exports = {
    dbConnection
}