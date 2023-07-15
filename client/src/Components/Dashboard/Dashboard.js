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

function Dashboard() {
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

  const [token, settoken] = useContext(store);
  const navigate = useNavigate();
  const claimvote = (data) => {
    alert(`yahooooooo!!!! You have successfully vote for ${data.name}`);
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
    localStorage.clear();
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

  return (
    <div className="screen1">
      <div className="navbar">
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
            {localStorage.getItem("userid") ? (
              <a href="/Profile">Profile</a>
            ) : (
              <a href="/">Rating</a>
            )}
            {exists ? (
              <a href="/Rooms">Rooms</a>
            ) : (
              <a href="/Register">Register</a>
            )}
            {exists ? (
              <a onClick={() => logout_1()} href="/">
                Logout
              </a>
            ) : (
              <a href="/Login">Login</a>
            )}
          </nav>
        </header>
      </div>
      <div>
        <div style={{ margin: "0px", display: "flex", flexDirection: "row" }}>
          {typeuser === "admin" ? (
            <button
              type="button"
              className="btn"
              data-toggle="modal"
              data-target="#exampleModal"
              style={{
                width: "max-content",
                height: "max-content",
                position: "absolute",
                top: "11%",
                marginLeft: "3%",

                zIndex: "100",
              }}
              onClick={() => {
                timer();
                setshow(false);
              }}
            >
              Please Set The Vote Timing in MINUTES
            </button>
          ) : null}

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        MINUTES
                      </span>
                    </div>
                    <input
                      type="text"
                      name="timer"
                      value={time}
                      onChange={(e) => {
                        settime(e.target.value);
                      }}
                      class="form-control"
                    />
                  </div>
                </div>
                <div
                  class="modal-footer"
                  onClick={() => {
                    setshow(true);
                    timer();
                  }}
                >
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    style={{ width: "max-content", height: "max-content" }}
                  >
                    SET TIMINGS
                  </button>
                </div>
              </div>
            </div>
          </div>

          {time && show ? timer_1(time) : null}
        </div>
      </div>
      <div className="room" style={{ position: "relative" }}>
        <div className="maindiv">
          <div
            className="voting-section"
            style={{ position: "relative", marginTop: "6%" }}
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

            {/* <div className='card-add' >
              <BsFillPersonPlusFill style={{height:'60px',width:'60px',border:'1px solid grey',padding:'10px',borderRadius:'10px',marginTop:'60px',boxShadow:'0 3px 5px grey'}}/><br/>
              <h2>Add <br/> Candidate</h2>
            </div> */}
            {typeuser === "admin" ? (
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

          <div
            className="voting-members"
            style={{ position: "relative", marginTop: "6%" }}
          >
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
              <div>
                {userslist &&
                  userslist.map((data, index) => {
                    return (
                      <div className="members-card">
                        <div style={{ width: "80%" }}>
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
                            console.log("n");
                            console.log(data);
                            deleteuser(data._id);
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className="note" style={{ bottom: "10px" }}>
            <input />
          </div>
          <button style={{ width: "12%", height: "60px", marginLeft: "1%" }}>
            <b>NOTA</b>
          </button>
        </div>
      </div>
      <div>
        <Container style={{ left: "30%" }}>
          <Input1
            type="text"
            value={copyText}
            style={{
              width: "350px",
              height: "35px",

              borderRadius: "10px",
            }}
            onChange={handleCopyText}
          />

          <Button
            onClick={copyToClipboard}
            style={{
              width: "max-content",
              height: "max-content",
              marginLeft: "1%",
              marginTop: "-2%",
            }}
          >
            Copy
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default Dashboard;

// <div>
//   <div className="item1">
//     <nav class="navbar navbar-expand-lg navbar-light bg-light">
//       <div class="container-fluid">
//         <button
//           class="navbar-toggler"
//           type="button"
//           data-mdb-toggle="collapse"
//           data-mdb-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <i class="fas fa-bars"></i>
//         </button>

//         <div class="collapse navbar-collapse" id="navbarSupportedContent">
//           <a class="navbar-brand mt-2 mt-lg-0" href="#">
//             <img
//               src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
//               height="15"
//               alt="MDB Logo"
//               loading="lazy"
//             />
//           </a>

//           <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//             <li class="nav-item">
//               <a class="nav-link" href="#">
//                 Dashboard
//               </a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#">
//                 Team
//               </a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" href="#">
//                 Projects
//               </a>
//             </li>
//           </ul>
//         </div>

//         <div class="d-flex align-items-center">
//           <a class="text-reset me-3" href="#">
//             <i class="fas fa-shopping-cart"></i>
//           </a>

//           <div class="dropdown">
//             <a
//               class="text-reset me-3 dropdown-toggle hidden-arrow"
//               href="#"
//               id="navbarDropdownMenuLink"
//               role="button"
//               data-mdb-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <i class="fas fa-bell"></i>
//               <span class="badge rounded-pill badge-notification bg-danger">
//                 1
//               </span>
//             </a>
//             <ul
//               class="dropdown-menu dropdown-menu-end"
//               aria-labelledby="navbarDropdownMenuLink"
//             >
//               <li>
//                 <a class="dropdown-item" href="#">
//                   Some news
//                 </a>
//               </li>
//               <li>
//                 <a class="dropdown-item" href="#">
//                   Another news
//                 </a>
//               </li>
//               <li>
//                 <a class="dropdown-item" href="#">
//                   Something else here
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div class="dropdown">
//             <a
//               class="dropdown-toggle d-flex align-items-center hidden-arrow"
//               href="#"
//               id="navbarDropdownMenuAvatar"
//               role="button"
//               data-mdb-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <img
//                 src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
//                 class="rounded-circle"
//                 height="25"
//                 alt="Black and White Portrait of a Man"
//                 loading="lazy"
//               />
//             </a>
//             <ul
//               class="dropdown-menu dropdown-menu-end"
//               aria-labelledby="navbarDropdownMenuAvatar"
//             >
//               <li>
//                 <a class="dropdown-item" href="#">
//                   My profile
//                 </a>
//               </li>
//               <li>
//                 <a class="dropdown-item" href="#">
//                   Settings
//                 </a>
//               </li>
//               <li>
//                 <a class="dropdown-item" href="#">
//                   Logout
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   </div>
//   <div class="grid-container">
//     <div class="item2">
//       <h2>Emails</h2>
//       <div className="emails">
//         {emails.map((email) => {
//           return (
//             <div className="email_show">
//               <p>{email.email}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//     <div class="item3">
//       <center>
//         <h4>Vote your Person</h4>
//       </center>
//       <div className="represent">
//         <div
//           className="represent_1"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-evenly",
//           }}
//         >
//           {
//          datas.map((data1) => {
//             return (
//               <Card style={{ width: "18rem" }}>
//                 <Card.Img variant="top" src="holder.js/100px180" />
//                 <Card.Body>
//                   <Card.Title>{data1.name}</Card.Title>
//                   <Card.Text>{data1.count}</Card.Text>
//                   <div
//                     style={{
//                       width: "100%",
//                       display: "flex",
//                       flexDirection: "row",
//                       padding: "10px",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     {" "}
//                     <Button variant="primary" >claim</Button>
//                     <Button variant="danger">declaim</Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             );
//           })}
//         </div>
//         <div
//           style={{
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             marginLeft: "30px",
//           }}
//           onClick={() => addrepresent()}
//         >
//           {" "}
//           <div className="ADD card" style={{ width: "20%" }}>
//             <div
//               className="card-body add_1"
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 textAlign: "center",
//               }}
//             >
//               {/* <AiOutlinePlusCircle
//               style={{ color: "#999999", width: "15vh", height: "15vh" }}
//             /> */}
//               <div class="plus-logo">
//                 <div class="plus-horizontal"></div>
//                 <div class="plus-vertical"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="stdings">
//         <div className="stdings_1">
//           <h3>Current Standings</h3>
//         </div>
//       </div>
//     </div>

//     <div class="item5">
//       <button className="btn btn-danger" onClick={() => logout_1()}>
//         logout
//       </button>
//     </div>
//   </div>
// </div>
