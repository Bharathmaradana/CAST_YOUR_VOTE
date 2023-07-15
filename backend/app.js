const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userschema = require("./Models/User");
const roomschema = require("./Models/Room");
const middleware = require("./middleware");
const { v4: uuidv4 } = require("uuid");
const Timer = require("./Models/Timer");
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.post("/register", async (req, res) => {
  try {
    const { name, rollno, email, password } = req.body;
    console.log(req.body.email);
    const exists = await userschema.findOne({ email: req.body.email });
    console.log("response");
    if (exists) {
      res.send("User already exists");
    } else {
      const userdata = new userschema({
        name,
        rollno,
        email,
        password,
        rooms: [],
        unqid: "",
        image: "",
      });
      await userdata.save();
      return res.status(200).send("registered successfully!!!");
    }
    return res.send("nothing returned");
  } catch (error) {
    console.log(error);
  }
});

// API endpoint to start the timer
app.post("/api/timer", async (req, res) => {
  try {
    const { roomId, minutes } = req.body;
    const timer = new Timer({
      roomId,
      minutes,
      timeRemaining: minutes * 60 * 1000,
    });
    await timer.save();
    res.status(200).json({ timerId: timer._id });
  } catch (error) {
    console.error("Error starting timer:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// API endpoint to fetch the timer data
app.get("/api/timer/:timerId", async (req, res) => {
  try {
    const timerId = req.params.timerId;
    const timer = await Timer.findById(timerId);
    res.json({
      roomId: timer.roomId,
      minutes: timer.minutes,
      timeRemaining: timer.timeRemaining,
      completed: timer.completed,
    });
  } catch (error) {
    console.error("Error fetching timer:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// API endpoint to update the timer data
app.put("/api/timer/:timerId", async (req, res) => {
  try {
    const timerId = req.params.timerId;
    const { timeRemaining, completed } = req.body;
    await Timer.findByIdAndUpdate(timerId, { timeRemaining, completed });
    res.status(200).json({ message: "Timer updated successfully" });
  } catch (error) {
    console.error("Error updating timer:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await userschema.findOne({ email: email });
    if (exists) {
      console.log(password);
      console.log(exists);
      if (password !== exists.password) {
        console.log("wrong password");
        return res.json({ error: "wrong password", token: "" });
      } else {
        const payload = {
          user: {
            id: exists.id,
          },
        };
        jwt.sign(
          payload,
          "jwtsecreat",
          { expiresIn: 360000000000000 },
          (err, token) => {
            if (err) {
              console.log(err);
            } else {
              console.log();
              console.log(token);
              return res.json({ token });
            }
          }
        );
      }
    } else {
      return res.json({ token: "", error: "user not exists please register" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/userdata", middleware, async (req, res) => {
  try {
    let ids = req.user.id;
    let data = await userschema.findById(ids);
    console.log(data);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// app.get("/gettime/:roomid",async (req,res) => {
//        try {
//               const data = await
//        } catch (error) {
//           console.log(error);
//        }
// })

app.post("/room/timer/:roomid/:time", async (req, res) => {
  try {
    const data = await roomschema.findByIdAndUpdate(
      { _id: req.params.roomid },
      { votingcount: req.params.time }
    );

    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/results", async (req, res) => {
  try {
    const { roomid } = req.body;

    const data = await roomschema.find({ _id: roomid });

    console.log(data);
    const winner = data[0].represents.reduce((acc, current) => {
      return current.count > acc.count ? current : acc;
    });
    return res.json(winner);
  } catch (error) {
    return res.json(error);
  }
});
app.post("/createroom/:id", async (req, res) => {
  try {
    let userid = req.params.id;

    const data = new roomschema({
      userid,
      represents: [],
      userslist: [],
      notes: [],
      votingtiming: "",
      votingcount: 10000,
      resultname: "",
      resultcount: "",
      removedlist: [],
    });
    let r = await data.save();

    let userdata = await userschema.findById({ _id: userid });
    console.log(userdata);
    console.log(data);
    await userschema.findByIdAndUpdate({ _id: userid }, { unqid: r._id });
    userdata.rooms.push({ roomid: r._id, count: 0, prevname: "", curname: "" });
    await userdata.save();

    return res.status(200).json(r);
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete/represent/:rollno", async (req, res) => {
  try {
    const rollno = req.params.rollno;
    const data = await roomschema.findOneAndRemove({
      represents: { rollno: rollno },
    });
    console.log(rollno);
    return res.json("successfully deleted");
  } catch (error) {
    console.log(error);
  }
});
app.post("/createroom/:id/represents", async (req, res) => {
  try {
    console.log("thinking");
    let roomid = req.params.id;
    // const exists = await roomschema.findOne({represents: [{name: req.body.name}]});
    // console.log(exists);
    // if(exists){
    //     return res.json("already user exists");
    // }
    // else{
    const { name, count, rollno } = req.body;
    const data = {
      name: name,
      count: count,
      rollno: rollno,
    };
    // console.log(data);
    let h = await roomschema.findById({ _id: roomid });
    h.represents.push(data);
    await h.save();
    let t = h.represents;
    let datas = t[t.length - 1];
    return res.status(200).json(datas);
  } catch (error) {
    console.log(error);
  }
});

app.get("/delelteparticipents/:userid/:roomid", async (req, res) => {
  try {
    const roomid = req.params.roomid;
    const participentid = req.params.userid;

    user = await userschema.findById(participentid);
    room = await roomschema.findById(roomid);
    let participent = await userschema.find({ rooms: { roomid: roomid } });
    user.rooms.pull(participent);
    user.save();
    return res.json("successfully removed from room");
  } catch (error) {
    console.log(error);
  }
});
app.get("/createroom/participents/:id", async (req, res) => {
  try {
    let roomid = req.params.id; // uniqueid
    let data = await userschema.find({ unqid: roomid });
    return res.status(200).json(data);
  } catch (error) {}
});

app.post("/addaccess/:roomid/:userid", async (req, res) => {
  try {
    const roomid = req.params.roomid;
    const userid = req.params.userid;

    room = await roomschema.findById(roomid);
    room.removedlist.pull(userid);
    room.save();
    return res.json("successfully given access");
  } catch (error) {
    console.log(error);
  }
});

app.post("/enterroom/:id/:userid", async (req, res) => {
  try {
    console.log("something");
    const reqid = req.params.id; // roomid
    const userid = req.params.userid;
    //  const unq= req.body.unq;  yaswanth logic but here point is when the user enter the room we will decode the room id into unique id
    const uniquecode = await roomschema.findOne({ _id: req.params.id });
    console.log(req.params.id);
    const checkdata = await roomschema.findOne({ userid: req.params.userid });
    const roomdata = await roomschema.findById({ _id: req.params.id });
    console.log(roomdata);
    if (uniquecode) {
      const exists = await roomschema.findById(reqid);
      let typeuser = "";
      let idid = userid.toString();
      let roomids = exists.userid.toString();
      if (roomids === idid) {
        typeuser = "admin";
      } else {
        typeuser = "user";
      }
      if (!checkdata) {
        console.log("user login");
        let userdata = await userschema.findById({ _id: userid });
        await userschema.findByIdAndUpdate({ _id: userid }, { unqid: reqid });
        const roomsdata = userdata.rooms;
        let a = false;
        roomsdata.map((data) => {
          let id = data.roomid;
          id = id.toString();
          if (id === reqid) {
            a = true;
          }
        });
        if (!a) {
          userdata.rooms.push({
            roomid: reqid,
            count: 0,
            prevname: "",
            curname: "",
          });

          await userdata.save();
        }
        const userslist = roomdata.userslist;
        let there = false;
        for (let i in userslist) {
          let userid = userslist[i].userid.toString();
          if (userid.toString() === req.params.userid.toString()) {
            there = true;
            console.log("nothing");
            console.log(userid.toString());
            console.log("some");
          }
        }
        if (!there) {
          roomdata.userslist.push({ userid: req.params.userid });

          await roomdata.save();
        }
        const userlistdata = roomdata.userslist;
        let userlistdata_1 = [];
        for (let i in userlistdata) {
          console.log(userlistdata[i]._id);
          ersid = toString(userlistdata[i]._id);
          let data_2 = await userschema.findOne({
            _id: userlistdata[i].userid,
          });
          console.log("nothing");
          console.log(data_2);
          console.log("some");
          if (data_2) {
            userlistdata_1.push(data_2);
          }
        }
        return res.json({
          exists: exists,
          type: typeuser,
          userlistnames: userlistdata_1,
        });
      } else {
        const exists = await roomschema.findById(reqid);
        let userdata = await userschema.findById({ _id: userid });
        await userschema.findByIdAndUpdate({ _id: userid }, { unqid: reqid });
        const roomsdata = userdata.rooms;
        let a = false;
        roomsdata.map((data) => {
          let id = data.roomid;
          id = id.toString();
          if (id === reqid) {
            a = true;
          }
        });
        if (!a) {
          userdata.rooms.push({
            roomid: reqid,
            count: 0,
            prevname: "",
            curname: "",
          });

          await userdata.save();
        }
        const userslist = roomdata.userslist;
        let there = false;
        for (let i in userslist) {
          let userid = userslist[i].userid.toString();
          if (userid.toString() === req.params.userid.toString()) {
            there = true;
            console.log("nothing");
            console.log(userid.toString());
            console.log("some");
          }
        }

        if (!there) {
          roomdata.userslist.push({ userid: req.params.userid });

          await roomdata.save();
        }
        const userlistdata = roomdata.userslist;
        let userlistdata_1 = [];
        for (let i in userlistdata) {
          ersid = toString(userlistdata[i]._id);
          let data_2 = await userschema.findById({
            _id: userlistdata[i].userid,
          });
          if (data_2) {
            userlistdata_1.push(data_2);
          }
        }
        return res.json({
          exists: exists,
          type: typeuser,
          userlistnames: userlistdata_1,
        });
      }
    } else {
      return res.json("no room");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/delete/:id1/:roomid", async (req, res) => {
  try {
    console.log("somethingsdkfnmsefkj");
    //  const data  =await roomschema.findOne({_id:req.params.roomid});
    //  const userslist = data.userslist;
    // roomschema.findOne({ _id: req.params.roomid }).then(function (data) {
    //   data.userslist.pull({ userid: mongoose.Types.ObjectId(req.params.id1) });
    //   console.log(data.userslist);
    //   data.save().then(() => {
    //     return res.json("deleted")
    //   });
    // });
    await roomschema.findOneAndUpdate(
      { _id: req.params.roomid },
      {
        $pull: {
          userslist: { userid: mongoose.Types.ObjectId(req.params.id1) },
        },
      },
      { safe: true, multi: false }
    );
    return res.json("deleted");
  } catch (error) {
    console.log(error);
  }
});
app.post("/removeparticipant/:id1/:id2", async (req, res) => {
  try {
    const roomid = req.params.id1;
    const particpentid = req.params.id2;

    room = await roomschema.findById(roomid);
    room.particpents.pull(particpentid);
    room.save();
    return res.json("successfully removed!!!");
  } catch (error) {
    console.log(error);
  }
});

app.post("/addnotes/:roomid1/:userid", async (req, res) => {
  try {
    const roomid = req.params.roomid1;
    const userid = req.params.userid;
    const text = req.body.notes;

    room = await roomschema.findById(roomid);
    user = await userschema.findById(userid);
    const person = user.name;

    const arr = {
      person,
      text,
    };
    // console.log(arr);

    room.notes.push({ person, text });
    room.save();
    return res.json("text added successfully!!!");
  } catch (error) {
    console.log(error);
  }
});

// voting

app.post("/enterroom/votecasting/:roomid", async (req, res) => {
  try {
    let roomdata = await roomschema.findById({ _id: req.params.roomid }); // roomschema complete data

    let data = roomdata.represents; // getting represents data

    let userid = roomdata.userid; // userid in roomdata so that user's side whether user has voted or not data according to that
    let userdata = await userschema.findById({ _id: userid }); // getting user's data from userschema
    //console.log(userdata);

    let roomsdatas = userdata.rooms; // entering into the userdata i.e rooms
    let h = "";
    // now this foreach for finding the present user room id
    roomsdatas.forEach((roomdata) => {
      if (roomdata.roomid == req.params.roomid) {
        // console.log(roomdata);
      }
    });
    // now this is for represent name in roomschema and claim vote
    let prevname = "";
    let count = 0;
    let curname = "";
    let rooms_data = userdata.rooms;
    rooms_data.map((datas) => {
      if (req.params.id === datas.roomid) {
        prevname = datas.prevname;
        count = datas.count;
      }
    });
    data.forEach((datas) => {
      if (datas.name === req.body.name) {
        if (prevname) {
          remove_vote(userid, req.params.id, prevname);
        }
        return res.status(200).json(datas);
      }
    });
    return res.status(200).json("not found");
  } catch (error) {
    console.log(error);
  }
});

const remove_vote = async (userid, roomid, prevname) => {
  try {
    const room_data = await roomschema.find({
      rooms: [{ prevname: prevname }],
    });
    const user_data = await userschema.findById(userid);
    // console.log(room_data);
    return room_data;
  } catch (error) {}
};
// casting the vote

app.post("/castingvote/:userid/:roomid/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const roomdata = await roomschema.findById({ _id: req.params.roomid });
    // console.log(roomdata);
    const userdata = await userschema.findOne({ _id: req.params.userid });
    // console.log(userdata);
    const represents = roomdata.represents;
    // console.log(represents);
    const roomsinuserdata = userdata.rooms;

    //  console.log(userdata.rooms);
    let prev = null;
    let count = -1;
    roomsinuserdata.map((data) => {
      let id = data.roomid;
      id = id.toString();

      if (id === req.params.roomid) {
        prev = data.prevname;
        count = data.count;
      }
    });

    if (prev) {
      represents.map((data) => {
        if (data.name === prev) {
          data.count = data.count - 1;
        }
      });
    }

    represents.map((data) => {
      if (data.name === name) {
        console.log(data.count);
        data.count = data.count + 1;
        prev = name;
      }
    });

    const r = await roomdata.save();

    roomsinuserdata.map((data) => {
      let id = data.roomid;
      id = id.toString();
      if (id === req.params.roomid) {
        data.prevname = prev;
      }
    });

    const user = await userdata.save();
    // console.log(user);

    return res.json("success fully updated");
  } catch (error) {
    console.log(error);
  }
});

app.get("/getrooms/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    const data = await roomschema.find({ userid: userid });
    const data_Set = await userschema.findById({ _id: userid });
    const result = {
      rooms_entered: data_Set.rooms.length,
      rooms_created: data.length,
    };
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

app.post("/upload-image", async (req, res) => {
  try {
    const { base64Image, id } = req.body;
    console.log(base64Image);
    const result = await userschema.findByIdAndUpdate(
      { _id: id },
      { image: base64Image }
    );
    console.log("user data");
    const data = await userschema.findById({ _id: id });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.get("/", (req, res) => {
  res.send("succesfully started");
});
mongoose
  .connect(
    "mongodb+srv://voting:OnlineVoting@cluster0.8dg6xqn.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB connected");
  });

app.listen(5003, () => {
  console.log("server started");
});

//  console.log(data);

//  for(i in data){
//      console.log(i);
//         if(i.name === req.body.name){
//                  return res.status(200).json(i);
//         }
//  }
//  let userid = roomdata._id;
//  let userdata = await userschema.findById({_id:userid});
//  let represents = await roomschema.findOne({name:req.body.name});
//  await roomschema.updateOne(
//    { name: req.body.name },
//    {
//      $set: {
//        "represents.$.count": {$inc: 1},
//      },
//    }
//  );
