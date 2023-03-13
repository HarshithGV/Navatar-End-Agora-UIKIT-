import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import RedirectWithTimer from './RedirectWithTimer';

function App() {
  const location = useLocation();
  const [booked_date, setInput1] = useState("27-02-2023");
  const [navatar_id, setInput2] = useState("1");
  const [options, setOptions] = useState();
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [times, setTimes] = useState([]);

  useEffect(() => {
  
    fetch(`https://navatar.sangamone.com/getListOfBookingByIdandDate?booked_date=${booked_date}&navatar_id=${navatar_id}`)
      .then((response) => response.json())
      .then((Actualdata) => {
        setTimes(Actualdata);
        
        console.log(times,"times");
      })},[]);
      

  const handleSelect = (e) => {
    setOptions(e.target.value);
    setIsOptionSelected(true);
  };

  return (
    <div style={{textAlign:"center"}}>
      
   <br></br>
   <table className="table">
       
       <tr>
         <th>Booked Id</th>
         <th>Booked Date</th>
         <th>Booked Timeslot</th>
         <th>User Id</th>
         <th>Booked Status</th>
         <th>Navatar ID</th>
       </tr>
       {times.map((post, i) => 
         <tr key= "i">
           <td> {post.booked_id} </td>
           <td> {post.booked_date} </td>
           <td>{post.booked_timeSlot}</td>
           <td> {post.user_id} </td>
           <td> {post.booked_status} </td>
           <td>{post.navatar_id}</td>
         </tr>
       )}
     </table>

     <br></br><br></br>
     <h1>Welcome to Navatar Video conferencing Room</h1>
      <RedirectWithTimer link="https://react-ts-agora-uikit.vercel.app/" delay={10000} />
    </div>
  );
}

export default App;
