const mongoose = require('mongoose')
const config =  require('config')
const db = config.get("mongoURI")

mongooseParams = {
useNewUrlParser:true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify:true
}

const connectDB = async () =>{
try{
    const connection = await mongoose.connect(db,mongooseParams);
    console.log("Database Connected Succesfully")
}catch(error){
console.log("Error"+error.message)
process.exit(1)
}
 
}


module.exports = connectDB 