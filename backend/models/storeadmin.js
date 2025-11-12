const mongoose = require('mongoose')

 const StoreSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role: { type: String, default: 'store-admin' }
 })

 const StoreModel = mongoose.model("storeadmin", StoreSchema)
 
 module.exports = StoreModel;
