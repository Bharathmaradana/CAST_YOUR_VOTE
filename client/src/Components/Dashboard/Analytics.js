import React, { FunctionComponent } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { useEffect, useState, useContext } from "react";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { store } from "../../App";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Heading, Input1, Input2, Container } from "./Styles";
import copy from "copy-to-clipboard";
import "./Analytics.css";
import ApexChart from "./ApexChart";
import ApexChart_1 from "./ApexChart_1";

export default function Analytics() {
  const [data, setdata] = useState("");
  const [count, setcount] = useState(0);
  const [percentage, setpercentage] = useState(0);
  const [percentage_1, setpercentage_1] = useState(0);

  const [copyText, setCopyText] = useState("");

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const copyToClipboard = () => {
    copy(copyText);
    alert(`You have copied "${copyText}"`);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5003/userdata", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        axios
          .post(
            "http://localhost:5003/enterroom/" +
              localStorage.getItem("roomid") +
              "/" +
              localStorage.getItem("userid")
          )
          .then((res) => {
            axios
              .get(
                "http://localhost:5003/getrooms/" +
                  localStorage.getItem("userid")
              )
              .then((res) => {
                setcount(res.data);
                console.log(res.data.rooms_created);
                setpercentage(res.data.rooms_entered);
                setpercentage_1(res.data.rooms_created);
              });
            console.log(res.data.exists.represents);
            let r = 0;
            const represents = res.data.exists.represents;
            for (let i in represents) {
              const data_1 = {
                name: r,
                uv: represents[i].count,
              };
              data.push(data_1);
              r += 1;
            }
            console.log(data);
          });
      });
  }, []);
  const [typeuser, settypeuser] = useState();
  const [datas, setdatas] = useState([]);
  const [time, settime] = useState();
  const [show, setshow] = useState(false);
  const [person, setvotedperson] = useState("");
  const [exists, setexists] = useState(false);
  const [userslist, setuserslist] = useState([]);
  const pie_data = [];
  const count_data = [];
  useEffect(() => {
    if (show == true && time == 0) {
      navigate("/timeout");
    }
  }, [time]);

  useEffect(() => {
    axios
      .get("http://localhost:5003/userdata", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const rooms = res.data.rooms;
        for (let i in rooms) {
          if (rooms[i].roomid === localStorage.getItem("roomid")) {
            setvotedperson(rooms[i].prevname);
          }
        }
        if (localStorage.getItem("roomid")) {
          setexists(true);

          axios
            .post(
              "http://localhost:5003/enterroom/" +
                localStorage.getItem("roomid") +
                "/" +
                localStorage.getItem("userid")
            )
            .then((res) => {
              setdata(res.data);
              setCopyText(localStorage.roomid);
              if (res.data.userlistnames) setuserslist(res.data.userlistnames);
              settypeuser(res.data.type);
              //  setpie_data({...pie_data,})

              console.log(res.data);
              for (let i = 0; i < res.data.exists.represents.length; i++) {
                //console.log(res.data.represents);

                let name = res.data.exists.represents[i].name;
                let count = res.data.exists.represents[i].count;
                pie_data.push(name);
                count_data.push(count);
              }
              setdatas(res.data.exists.represents);
              settime(res.data.exists.votingcount);
              if (parseInt(res.data.exists.votingcount) > 0) setshow(true);
              else navigate("/timeout");
            });
        } else {
          console.log("no room");
        }
      });
  }, []);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [token, settoken] = useContext(store);
  const navigate = useNavigate();

  return (
    <div>
      {" "}
      <header>
        <a href="#" className="logo">
          <span>ClaimYour</span>Vote
        </a>

        <input type="checkbox" id="menu-bar" />
        <label for="menu-bar" className="fas fa-bars"></label>

        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/">Features</a>
          {exists ? <a href="/Dashboard">Dasboard</a> : <a href="/">About</a>}
          {exists ? <a href="/Profile">Profile</a> : <a href="/">Rating</a>}

          {localStorage.getItem("token") ? (
            <a href="/Rooms">Rooms</a>
          ) : (
            <a href="/Register">Register</a>
          )}
          {localStorage.getItem("token") ? (
            <a href="/">Logout</a>
          ) : (
            <a href="/Login">Login</a>
          )}
        </nav>
      </header>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ height: "100%", width: "50%" }}>
          <div className="progress_1">
            <CircularProgressbar
              value={percentage}
              text={`Rooms you created == ${percentage}`}
              className="circularbar"
              styles={buildStyles({
                textStyle: {
                  fontSize: "5px", // Adjust the font size as per your preference
                },
              })}
            />
            <CircularProgressbar
              value={percentage}
              text={`Rooms you entered == ${percentage_1}`}
              styles={buildStyles({
                pathColor: `red`,
                textStyle: {
                  fontSize: "5px", // Adjust the font size as per your preference
                },
              })}
              className="circularbar_1"
            />
            <CircularProgressbar
              value={percentage}
              text={`Voted or Not`}
              styles={buildStyles({
                pathColor: `green`,
                textStyle: {
                  fontSize: "5px", // Adjust the font size as per your preference
                },
              })}
              className="circularbar_1"
            />
          </div>
        </div>
        <div style={{ height: "100%", width: "40%", margin: "auto" }}>
          <div
            className="progress_1"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <p>Your CURRENT ROOM UNIQUE ID: </p>
            <p style={{ color: "red" }}>{localStorage.roomid}</p>
            <p>Your CURRENTLY VOTED FOR IN THE ABOVE ROOM IS:</p>
            <p style={{ color: "red" }}>{person}</p>
            <p></p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          width: "100%",
          marginLeft: "20%",
        }}
      >
        <div
          className="progress_1"
          style={{
            marginTop: "2%",
            width: "max-content",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              justifyContent: "content",
              margin: "auto",
              marginLeft: "5%",
            }}
          >
            <ApexChart />
          </div>
        </div>
        <div
          className="progress_1"
          style={{
            marginTop: "2%",
            width: "max-content",
            display: "flex",
            flexDirection: "row",
            width: "30%",
            height: "50%",
          }}
        >
          <div
            style={{
              justifyContent: "content",
              margin: "auto",
              marginLeft: "5%",
            }}
          >
            <ApexChart_1 />
          </div>
        </div>
      </div>
    </div>
  );
}
