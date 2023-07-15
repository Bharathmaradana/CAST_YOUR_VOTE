import React,{useState} from 'react'
import { Navigate,useNavigate } from 'react-router-dom';
import './main1.css'
import axios from 'axios'
import Dashboard from './Dashboard/Dashboard';
function Register() {
  const navigate  = useNavigate()
  const [check,setcheck] = useState(false);
   const [data, setdata] = useState({
     name: "",
     rollno: "",
     email: "",
     password: "",
   });
    const handleChange = (e) => {
      setdata({ ...data, [e.target.name]: e.target.value });
      console.log(data);
    };
     const submitdata = (e) => {
       e.preventDefault();
       axios.post("http://localhost:5003/register", data).then((res) => {
                             if(res.data == "registered successfully!!!"){
                              console.log("osmething");
                                      navigate("/login")
                             }
                             else{
                            setcheck(true)
                              console.log(res.data)
                             }
       });
       setdata({
         name: "",
         rollno: "",
         email: "",
         password: "",
       });
     };
  return (
    <div className='something'>
      <div className="container_1">
        <div className="title">Registration</div>
        <div className="content">
          <form action="#" onSubmit={submitdata}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input type="text" placeholder="Enter your name" name="name" onChange={handleChange} value={data.name} required />
              </div>

              <div className="input-box">
                <span className="details">Roll Number</span>
                <input type="text" placeholder="Enter your number" name="rollno" onChange={handleChange} value={data.rollno}required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" placeholder="Enter your email" name="email" onChange={handleChange} value={data.email} required />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input type="text" placeholder="Enter your password" name="password"  onChange={handleChange} value={data.password} required />
              </div>
            </div>

            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;