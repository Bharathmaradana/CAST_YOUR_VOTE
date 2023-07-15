import React from "react";
import { store } from "../../App";
import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashcss.css";

function Rooms() {
  const navigate = useNavigate();
  const [roomid, setdata] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5003/userdata", {
        headers: { "x-token": localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("userid", res.data._id);
      });
  }, []);

  const [token, settoken] = useContext(store);

  if (localStorage.getItem("token") == null) {
    return <Navigate to="/login" />;
  }
  const logout_1 = () => {
    localStorage.clear();
    refreshPage();
    function refreshPage() {
      window.location.reload(false);
    }
  };

  const enterroom = () => {
    if (roomid && roomid.length >= 12) {
      localStorage.setItem("roomid", roomid);

      axios
        .post(
          "http://localhost:5003/enterroom/" +
            localStorage.getItem("roomid") +
            "/" +
            localStorage.getItem("userid")
        )
        .then((res) => {
          console.log("nothing");
          console.log(res.data.type);
          if (res.data === "no room") {
            alert("There is No room on that unique code");
            setdata("");
          } else {
            navigate("/Dashboard", { type: res.data.type });
          }
        });
    } else {
      alert("Please enter 12 letter of unique code");
      localStorage.setItem("roomid", "");
      setdata("");
    }
  };
  const createroom = () => {
    axios
      .post(
        "http://localhost:5003/createroom/" + localStorage.getItem("userid")
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("roomid", res.data._id);
        axios
          .post(
            "http://localhost:5003/enterroom/" +
              localStorage.getItem("roomid") +
              "/" +
              localStorage.getItem("userid")
          )
          .then((res) => {
            console.log("nothing");
            console.log(res.data.type);
            console.log("yes");
            navigate("/Dashboard", { type: res.data.type });
          });
      });
  };
  return (
    // <div style={{ display: "flex", flexDirection: "column" }}>
    //   Rooms
    //   <button onClick={() => enterroom()} className="btn btn-primary">
    //     Enter Room
    //   </button>
    //   <input
    //     type="text"
    //     name="roomid"
    //     value={roomid}
    //     onChange={(e) => setdata(e.target.value)}
    //   />
    //   <button onClick={() => createroom()} className="btn btn-secondary">
    //     Create Room
    //   </button>
    //   <button onClick={() => logout_1()} className="btn btn-danger">
    //     loguout
    //   </button>
    // </div>
    <div>
      <header>
        <a href="#" className="logo">
          <span>ClaimYour</span>Vote
        </a>

        <input type="checkbox" id="menu-bar" />
        <label for="menu-bar" className="fas fa-bars"></label>

        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/">Features</a>
          {localStorage.getItem("roomid") ? (
            <a href="/Dashboard">Dasboard</a>
          ) : (
            <a href="/">About</a>
          )}
          {localStorage.getItem("token") ? (
            <a href="/Profile">Profile</a>
          ) : (
            <a href="/">Rating</a>
          )}

          {localStorage.getItem("token") ? (
            <a href="/Rooms">Rooms</a>
          ) : (
            <a href="/Register">Register</a>
          )}
          {localStorage.getItem("token") ? (
            <a onClick={() => logout_1()} href="/">
              Logout
            </a>
          ) : (
            <a href="/Login">Login</a>
          )}
        </nav>
      </header>
      <div
        style={{
          right: "10px",

          textAlign: "right",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <button
          className="btn"
          style={{
            width: "max-content",
            height: "max-content",
            marginRight: "80px",
          }}
          onClick={() => logout_1()}
        >
          logout
        </button>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
        className="rooms_2"
      >
        <div className="rooms_1">
          <h1>Want to Enter into Your Room</h1>
          {/* <input
            type="text"
            name="roomid"
            className="unqid"
            value={roomid}
            onChange={(e) => {
              setdata(e.target.value);
            }}
          /> */}

          <div className="input-group mb-3 input-data">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon3">
                UNIQUE CODE
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="roomid"
              value={roomid}
              onChange={(e) => {
                setdata(e.target.value);
              }}
              aria-describedby="basic-addon3"
            />
          </div>
          <div>
            <button
              className="btn"
              onClick={() => enterroom()}
              style={{ width: "max-content", height: "max-content" }}
            >
              Enter Room
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
        className="rooms_2"
      >
        <div className="rooms_1">
          <h1>Want to Create a Room</h1>
          {/* <input
            type="text"
            name="roomid"
            className="unqid"
            value={roomid}
            onChange={(e) => {
              setdata(e.target.value);
            }}
          /> */}

          <div>
            <button
              className="btn"
              onClick={() => createroom()}
              style={{ width: "max-content", height: "max-content" }}
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
