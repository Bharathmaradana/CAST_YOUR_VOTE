import React from "react";
import "./Home.css";
import homeimg from "./imgs/f4.png";
import aboutimg from "./imgs/about-img.png";
import ficon1 from "./imgs/f-icon1.png";
import ficon2 from "./imgs/f-icon2.png";
import ficon3 from "./imgs/f-icon3.png";
import contactimg from "./imgs/contact-img.png";
import pic1 from "./imgs/pic1.png";
import pic2 from "./imgs/pic2.png";
import pic3 from "./imgs/pic3.png";
import { Navigate } from "react-router-dom";
function Home() {
  const logout_1 = () => {
    localStorage.clear();
    refreshPage();
    function refreshPage() {
      window.location.reload(false);
    }
  };

    
  return (
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
          {localStorage.getItem("userid") ? (
            <a href="/Profile">Profile</a>
          ) : (
            <a href="/">Rating</a>
          )}

          {localStorage.getItem("userid") ? (
            <a href="/Rooms">Rooms</a>
          ) : (
            <a href="/Register">Register</a>
          )}
          {localStorage.getItem("userid") ? (
            <a onClick={() => logout_1()} href="/">
              Logout
            </a>
          ) : (
            <a href="/Login">Login</a>
          )}
        </nav>
      </header>

      <section className="home" id="home">
        <div className="content">
          <h3>
            Get your vote <span>Make your Future</span>
          </h3>
          <p>
            We Provide you to conduct online voting in which every one can claim
            their vote from any where in the world. Claiming your vote makes a
            new future . Come with Us!! We shape the Future
          </p>
          <a href="/Login" className="btn">
            Register/Login Now
          </a>
        </div>

        <div className="image">
          <img src={homeimg} alt="" />
        </div>
      </section>

      <section className="features" id="features">
        <h1 className="heading"> We Provide You </h1>

        <div className="box-container">
          <div className="box">
            <img src={ficon1} alt="" />
            <h3>Make Rooms For Your Class votings</h3>
            <p>
              We provide you to create a room for your class and volunteer can
              create that will conduct the election and the results will be
              decleared through digitally.
            </p>
            <a href="/login" className="btn">
              Create
            </a>
          </div>

          <div className="box">
            <img src={ficon2} alt="" />
            <h3>Make Rooms For Your Campus votings</h3>
            <p>
              We provide you to create a room for your Campus and volunteer can
              create that ,will conduct the election and the results will be
              decleared through digitally.
            </p>
            <a href="#" className="btn">
              Register
            </a>
          </div>

          <div className="box">
            <img src={ficon3} alt="" />
            <h3>Make Rooms to elect your Political Leader</h3>
            <p>
              We provide you to create a room for your Local Area and volunteer
              can create that,will conduct the election and the results will be
              decleared through digitally.
            </p>
            <a href="#" className="btn">
              Login
            </a>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <h1 className="heading"> about the app </h1>

        <div className="column">
          <div className="image">
            <img src={aboutimg} alt="" />
          </div>

          <div className="content">
            <h3>Easy And Perfect Solution For Voting through online</h3>
            <p>
              The pandemic emphasized the preciousness of life, reminding us of
              the importance of health, well-being, and the people we hold dear.
              It taught us to appreciate the simple joys and moments that make
              life meaningful, such as spending time with loved ones, pursuing
              passions, and cherishing our mental and emotional well-being.
            </p>
            <p>
              We our one among us and created this site to make everything
              digilized and this online voting is system one among them . Where
              ever you are you can claim you vote for a better society
            </p>
            <div className="buttons">
              <a href="/login" className="btn">
                {" "}
                <i className="fab fa-apple"></i> Login
              </a>
              <a href="/register" className="btn">
                {" "}
                <i className="fab fa-google-play"></i> Register
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="newsletter">
        <h3>Subscribe For New Features</h3>
        <p>Please ping us for forther information our people will reach out</p>
        <form action="">
          <input type="email" placeholder="enter your email" />
          <input type="submit" value="Get in touch" />
        </form>
      </div>

      <section className="pricing" id="pricing">
        <h1 className="heading"> Our Pricing Plans </h1>

        <div className="box-container">
          <div className="box">
            <h3 className="title">basic</h3>
            <div className="price">FREE</div>
            <ul>
              <li>
                {" "}
                <i className="fas fa-check"></i> 1000 USERS{" "}
              </li>
              <li>
                {" "}
                <i className="fas fa-check"></i> No transaction fees{" "}
              </li>
              <li>
                {" "}
                <i className="fas fa-times"></i> 100 Rooms{" "}
              </li>
              <li>
                {" "}
                <i className="fas fa-times"></i> 1000 Enteries{" "}
              </li>
            </ul>
            <a href="/Login" className="btn">
              check out
            </a>
          </div>

          <div className="box">
            <h3 className="title">standard</h3>
            <div className="price">
              $15<span>/monthly</span>
            </div>
            <ul>
              <li>
                {" "}
                <i className="fas fa-check"></i> 5000+ USERS{" "}
              </li>
              <li>
                {" "}
                <i className="fas fa-check"></i> No transaction fees{" "}
              </li>
              <li>
                {" "}
                <i className="fas fa-times"></i> 1000 Rooms{" "}
              </li>
              <li>
                {" "}
                <i className="fas fa-times"></i> 10000 Enteries{" "}
              </li>
            </ul>
            <a href="/Login" className="btn">
              check out
            </a>
          </div>

          <div className="box">
            <h3 className="title">premium</h3>
            <div className="price">
              $25<span>/monthly</span>
            </div>
            <ul>
              <li>
                {" "}
                <i className="fas fa-check"></i> 10000+ USERS{" "}
              </li>
              <li>
                {" "}
                <i className="fas fa-check"></i> No transaction fees{" "}
              </li>
              <li>
                {" "}
                <i className="fas fa-times"></i> unlimited Rooms{" "}
              </li>
              <li>
                {" "}
                <i className="fas fa-times"></i> unlimited Enteries{" "}
              </li>
            </ul>
            <a href="/Login" className="btn">
              check out
            </a>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="image">
          <img src={contactimg} alt="" />
        </div>

        <form action="">
          <h1 className="heading">contact us</h1>

          <div className="inputBox">
            <input type="text" required />
            <label>name</label>
          </div>

          <div className="inputBox">
            <input type="email" required />
            <label>email</label>
          </div>

          <div className="inputBox">
            <input type="number" required />
            <label>phone</label>
          </div>

          <div className="inputBox">
            <textarea required name="" id="" cols="30" rows="10"></textarea>
            <label>message</label>
          </div>

          <input type="submit" className="btn" value="send message" />
        </form>
      </section>

      <div className="footer" style={{ color: "black" }}>
        <div className="box-container">
          <div className="box" style={{ color: "black" }}>
            <h3 style={{ color: "black" }}>about us</h3>
            <p>
              We are team of two who faced the reality of covid and faced many
              crises and lost people so we developed this inorder to reduce the
              loss because of pandemic
            </p>
          </div>

          <div className="box">
            <h3>quick links</h3>
            <a href="#">home</a>
            <a href="#">features</a>
            <a href="#">about</a>
            <a href="#">review</a>
            <a href="#">pricing</a>
            <a href="#">contact</a>
          </div>

          <div className="box">
            <h3>follow us</h3>
            <a href="#">facebook</a>
            <a href="#">instagram</a>
            <a href="#">pinterest</a>
            <a href="#">twitter</a>
          </div>

          <div className="box">
            <h3>contact info</h3>
            <div className="info">
              <i className="fas fa-phone"></i>
              <p>
                {" "}
                +91-8886914949 <br /> +91-7569967428{" "}
              </p>
            </div>
            <div className="info">
              <i className="fas fa-envelope"></i>
              <p>
                {" "}
                bharathmaradana86@gmail.com <br />{" "}
                yaswanthpilla1752003@gmail.com{" "}
              </p>
            </div>
            <div className="info">
              <i className="fas fa-map-marker-alt"></i>
              <p> Andhra Pradesh, india - 400104 </p>
            </div>
          </div>
        </div>

        <h1 className="credit">
          {" "}
          &copy; copyright @ 2021 by Online_voting_System
        </h1>
      </div>
    </div>
  );
}

export default Home;
