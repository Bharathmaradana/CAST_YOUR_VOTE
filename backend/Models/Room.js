const mongoose = require("mongoose");

const roomschema = new mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "userschema",
  },
  represents: [
    {
      name: String,
      count: Number,
      rollno: String,
    },
  ],
  userslist:[{
    userid: {type:mongoose.Types.ObjectId}
  }],

  notes: [
    {
      person: String,
      text: String,
    },
  ],
 
  votingtiming: String,
  votingcount: { type: Number },
  resultname: { type: String },
  resultcount: { type: String },
  removedlist: [String],
});

module.exports = mongoose.model("roomschema", roomschema);
