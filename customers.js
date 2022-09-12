import mongoose from "mongoose";

const schemaName = mongoose.Schema({
    cid : Number,
    cname:String,
    email:String,
    dob: String,
    age:Number,
    salary:Number,
    did:Number,
    designation:String,
    pincode:Number,
    pancard:String,
    mobilenumber:Number,
    status:Number,
    authkey:String,
    username:String,
    oldpassword:String,
    password:String,
    confirmpassword:String,
    newpassword:String,

})
export default mongoose.model('customers',schemaName)
