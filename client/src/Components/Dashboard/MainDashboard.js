import "./MainDashboard.css";
import "../LandingPage/Home.css";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { store } from "../../App";
import "./dashcss.css";
import axios from "axios";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FcOk } from "react-icons/fc";
import Timer from "../Timer";
import { AiFillDelete } from "react-icons/ai";
import copy from "copy-to-clipboard";
import { Heading, Input1, Input2, Container } from "./Styles";
import DatePicker from "react-datepicker";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ApexChart from "./ApexChart";

const MySwal = withReactContent(Swal);
function MainDashboard() {
  const [popup, setpopup] = useState();
  const [data, setdata] = useState([
    {
      name: "someone",
      count: 0,
      strengths: "something",
    },
  ]);
  const [copyText, setCopyText] = useState("");

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

  const copyToClipboard = () => {
    copy(copyText);
    alert(`You have copied "${copyText}"`);
  };

  const [typeuser, settypeuser] = useState();
  const [datas, setdatas] = useState([]);
  const [time, settime] = useState();
  const [show, setshow] = useState(false);
  const [person, setvotedperson] = useState("");
  const [exists, setexists] = useState(false);
  const [userslist, setuserslist] = useState([]);

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
        console.log(res.data);

        const rooms = res.data.rooms;
        for (let i in rooms) {
          console.log(localStorage.getItem("roomid"));
          console.log(rooms[i]);
          if (rooms[i].roomid === localStorage.getItem("roomid")) {
            console.log(i.roomid);
            setvotedperson(rooms[i].prevname);
            localStorage.votedperson = rooms[i].prevname;
          }
        }
        if (localStorage.getItem("roomid")) {
          setexists(true);
          setCopyText(localStorage.getItem("roomid"));
          axios
            .post(
              "http://localhost:5003/enterroom/" +
                localStorage.getItem("roomid") +
                "/" +
                localStorage.getItem("userid")
            )
            .then((res) => {
              setdata(res.data.exists);
              if (res.data.userlistnames) setuserslist(res.data.userlistnames);
              settypeuser(res.data.type);

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
  const [selectedDate, setSelectedDate] = useState("2023-07-15");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [token, settoken] = useContext(store);
  const navigate = useNavigate();
  const claimvote = (data) => {
    //  alert(`yahooooooo!!!! You have successfully vote for ${data.name}`);
    MySwal.fire(`yahooooooo!!!! You have successfully vote for ${data.name}`);
    setvotedperson(data.name);
    const name = data.name;
    axios
      .post(
        "http://localhost:5003/castingvote/" +
          localStorage.getItem("userid") +
          "/" +
          localStorage.getItem("roomid") +
          "/" +
          name
      )
      .then((res) => {
        console.log(res);
      });
  };

  const timer = () => {
    axios
      .post(
        "http://localhost:5003/room/timer/" +
          localStorage.getItem("roomid") +
          "/" +
          time
      )
      .then((res) => {
        console.log(res);
      });
  };

  if (localStorage.getItem("token") == null) {
    return <Navigate to="/login" />;
  }
  // useEffect(() =>
  // {
  //   console.log(token)
  //   if(token){
  //     console.log("stay");
  //   }
  //   else{
  //    console.log(token)
  //   }
  // },[token])

  const timer_1 = (time) => {
    return (
      <Timer
        initialMinute={time}
        initialSeconds={60}
        style={{
          position: "relative",
          paddingLeft: "40px",
          zIndex: "1000",
          backgroundColor: "red",
          color: "red",
        }}
      />
    );
  };
  const deleteuser = (id) => {
    axios
      .post(
        "http://localhost:5003/delete/" +
          id +
          "/" +
          localStorage.getItem("roomid")
      )
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
  };
  const addrepresent = () => {
    navigate("/addrepresent", {
      state: { id: localStorage.getItem("roomid") },
    });
  };
  const logout_1 = () => {
    localStorage.clear();

    refreshPage();
    function refreshPage() {
      window.location.reload(false);
    }
  };
 const popup_1 = () => {
   MySwal.fire({
     title: "Select a date",
     html: (
       <input type="date" selected={selectedDate} onChange={handleDateChange} />
     ),
     confirmButtonText: "OK",
     showCancelButton: true,
     cancelButtonText: "Cancel",
     preConfirm: () => {
       return new Promise((resolve) => {
         resolve(selectedDate);
       });
     },
   }).then((result) => {
     if (result.isConfirmed) {
       const selectedDate = result.value;
       // Handle the selected date
       console.log("Selected date:", selectedDate);
     }
   });
 };

  return (
    <div>
      <div
        className="dash__1"
        style={{
          width: "100%",
          position: "absolute",
        }}
      >
        <div className="dash_nav">
          <header>
            <a href="#" className="logo">
              <span>ClaimYour</span>Vote
            </a>

            <input type="checkbox" id="menu-bar" />
            <label for="menu-bar" className="fas fa-bars"></label>

            <nav className="navbar">
              <a href="/">Home</a>
              <a href="/">Features</a>
              {exists ? (
                <a href="/Dashboard">Dasboard</a>
              ) : (
                <a href="/">About</a>
              )}
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
        </div>
        <div className="dash__2" style={{ position: "relative" }}>
          <div className="dash__3">
            <div className="dash__4">
              <button
                type="button"
                className="btn"
                data-toggle="modal"
                data-target="#exampleModal"
                style={{
                  width: "max-content",
                  height: "max-content",
                  marginTop: "1.7rem",
                }}
                onClick={() => popup_1()}
              >
                SET TIMER
              </button>
            </div>

            <div className="dash__5">
              <div className="dash__timer">
                <p style={{ fontWeight: "1000" }}>ENDPOINT:   </p>
                <p>{selectedDate}</p>
              </div>
            </div>
            <div className="dash__6" style={{ width: "max-content" }}>
              <div className="dash__code">
                <Container style={{ display: "flex", marginTop: "20px" }}>
                  <input
                    style={{
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                      width: "200px",
                    }}
                    type="text"
                    value={copyText}
                    className=""
                    onChange={handleCopyText}
                  />

                  <button
                    className="btn"
                    onClick={copyToClipboard}
                    style={{
                      width: "max-content",
                      height: "max-content",
                      marginTop: "-0.3rem",

                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                    }}
                  >
                    Copy
                  </button>
                </Container>
              </div>
            </div>
          </div>
        </div>
        <div className="dash__7">
          <div className="dash__8">
            <div
              className="dash__9"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              {datas &&
                datas.map((data) => {
                  return (
                    <div className="voting-cards">
                      <img
                        className="voting-img"
                        src="IMG_2795.jpg"
                        alt="hey hai"
                      />
                      <br />
                      <br />
                      <b>Name: {data.name}</b>
                      <br />
                      <b>Roll No: {data.rollno}</b>
                      <br />
                      <br />
                      <Button
                        style={{ height: "max-content", width: "max-content" }}
                        variant="contained"
                        onClick={() => claimvote(data)}
                      >
                        <b>Vote</b>
                      </Button>
                    </div>
                  );
                })}

              {typeuser == "admin" ? (
                <div
                  className="card-add"
                  onClick={() => addrepresent()}
                  style={{ position: "relative", marginTop: "6%" }}
                >
                  <BsFillPersonPlusFill
                    style={{
                      height: "90px",
                      width: "90px",
                      border: "1px solid grey",
                      padding: "10px",
                      borderRadius: "10px",
                      marginTop: "60px",
                      boxShadow: "0 3px 5px grey",
                    }}
                  />
                  <br />
                  <h2 style={{ marginTop: "30px" }}>
                    Add <br /> Candidate
                  </h2>
                </div>
              ) : null}
            </div>

            <div className="dash__10">
              <div
                className="voting-members"
                style={{
                  position: "relative",
                  marginTop: "6%",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                {typeuser == "admin" ? (
                  <div>
                    <button
                      className="btn"
                      style={{ width: "60%" }}
                      onClick={() => {
                        navigate("/results");
                      }}
                    >
                      Show Results
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn"
                    style={{ height: "max-content", width: "60%" }}
                    onClick={() => {
                      navigate("/analytics");
                    }}
                  >
                    Show Analytics
                  </button>
                )}
                <div className="voted-person">
                  {person ? (
                    <h3>
                      The one you currently voted:{" "}
                      <h1 style={{ color: "blue" }}>{person}</h1>
                    </h3>
                  ) : (
                    <h3>You have not voted anyone please vote</h3>
                  )}
                </div>
                {typeuser === "admin" ? (
                  <div style={{ width: "100%" }}>
                    {userslist &&
                      userslist.map((data, index) => {
                        return (
                          <div className="members-card">
                            <div style={{ width: "100%" }}>
                              <b style={{ fontSize: "18px" }}>{data.name}</b>
                            </div>
                            <FcOk
                              style={{
                                width: "25px",
                                height: "25px",
                                marginRight: "10px",
                              }}
                            />
                            <AiFillDelete
                              style={{
                                width: "25px",
                                height: "25px",
                                position: "relative",
                              }}
                              onClick={() => {
                                deleteuser(data._id);
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
