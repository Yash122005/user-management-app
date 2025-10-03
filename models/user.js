const mongoose  = require('mongoose');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/CRUD_EJS`)
        console.log(`mongoDb connection successfull!! DB HOST : ${connectionInstance} ` );
        
    } catch(error){
        console.log("MONGODB connection ERROR: ", error);
        process.exit(1); 
    }
}

const userSchemea = new mongoose.Schema({
    image: String,
    name: String,
    email: String
}); 

const User = mongoose.model('user', userSchemea);
module.exports = { User, connectDB };