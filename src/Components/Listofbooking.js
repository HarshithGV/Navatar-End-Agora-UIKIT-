import React, { useState } from "react";
import RedirectWithTimer from './RedirectWithTimer';

function App() {
  const [booked_date, setInput1] = useState("27-02-2023");
  const [navatar_id, setInput2] = useState("1");
  const [bookings, setBookings] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://navatar.sangamone.com/getListOfBookingByIdandDate?booked_date=${booked_date}&navatar_id=${navatar_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{textAlign:"center"}}>
    <h1>Enter date and Navatar ID</h1>
      <form onSubmit={handleSubmit}>
      <br/>
          
          <input type="text" value={booked_date} onChange={(event) => setInput1(event.target.value)} /><br/><br/>     
         
          <input type="text" value={navatar_id} onChange={(event) => setInput2(event.target.value)} /><br/><br/>
     
        <button type="submit">Fetch bookings</button>
      </form><br/><br/>
      <div> <h1 style={{textAlign: "center"}}>List of Bookings for the Day</h1> <br/><br/>
      <table className="table">
       
        <tr>
          <th>Booked Id</th>
          <th>Booked Date</th>
          <th>Booked Timeslot</th>
          <th>User Id</th>
          <th>Booked Status</th>
          <th>Navatar ID</th>
        </tr>
        {bookings.map((post, i) => 
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
      </div>
      <div>
      <h1>Welcome to Navatar Video conferencing Room</h1>
      <RedirectWithTimer link="https://react-ts-agora-uikit.vercel.app/" delay={10000} />
    </div>
    </div>
  );
}

export default App;
