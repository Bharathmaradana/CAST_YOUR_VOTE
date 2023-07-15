const mongoose = require("mongoose");

const Timer = mongoose.model("Timer", {
  timerId: String,
  roomId: String,
  minutes: Number,
  timeRemaining: {
    minutes: Number,
    seconds: Number,
  },
});

module.exports = Timer;
