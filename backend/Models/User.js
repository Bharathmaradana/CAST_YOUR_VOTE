const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
       
          name: {
           type: String,
            required: true
          },
         rollno: {
           type : String,
            required:true
          },
          email: {
           type: String,
            required: true
          },
          password: {
            type: String,
            required:true
          },
          rooms:[{roomid: {type:mongoose.Types.ObjectId},count:Number,prevname:String,curname:String}],
          unqid: [String],
          image:String

})

module.exports = mongoose.model("userschema",UserSchema);
