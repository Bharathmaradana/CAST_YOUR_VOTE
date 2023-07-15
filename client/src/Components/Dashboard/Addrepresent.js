import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useLocation,Navigate,useNavigate } from 'react-router-dom'
function Addrepresent() {
    const [roomdata,setroomdata] = useState([]);
  
    useEffect(() => {
                     axios
                               .post(
                                 "http://localhost:5003/enterroom/" +
                                   localStorage.getItem("roomid") + "/" + localStorage.getItem("userid")
                               )
                               .then((res) => {
                                 console.log(res.data);
                                //  setroomdata(res.data)
                                //  console.log(roomdata)
                               });
                         });
   
    const location = useLocation();
    const navigate = useNavigate();
    const [data,setdata] = useState({
        name:"",
        count:0,
        rollno:""
    })

    const handleChange = (e) =>{
        setdata({...data,[e.target.name]:e.target.value});
        console.log(data)
    }

    const submitdata = () =>{
      
                        axios.post(
                          `http://localhost:5003/createroom/${localStorage.getItem("roomid")}/represents`,data
                        ).then((res) => {
                            console.log(res.data);
                            
                        });
                      
                       navigate("/dashboard")
    }
  return (
    <div>
        <form>
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} value={data.name}/>
            <label>Count</label>
            <input type="number" name='count' onChange={handleChange} value={data.count}/>
            <label>strengths</label>
            <input type="text" name="rollno" onChange={handleChange} value={data.rollno}/>
            <button onClick={() => submitdata()}>Submit</button>
        </form>
    </div>
  )
}

export default Addrepresent