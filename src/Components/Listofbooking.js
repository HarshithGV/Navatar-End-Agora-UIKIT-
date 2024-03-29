import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ListOfBooking() {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().slice(0, 10));
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const navatarid = location.state?.navatarid || 1;
    fetch(`https://navatar.sangamone.com/getListOfBookingByIdandDate?bookingDate=${bookingDate}&navatar_id=${navatarid}`)
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error(error));
  }, [bookingDate, location.state?.navatarid]);

  useEffect(() => {
    if (bookings.length > 0) {
      let nextBookingIndex = 0;
      const now = new Date().getTime();
      while (nextBookingIndex < bookings.length && new Date(`${bookingDate} ${bookings[nextBookingIndex].booked_timeSlot}:00`).getTime() < now) {
        nextBookingIndex++;
      }
      if (nextBookingIndex === bookings.length) {
        setTimeLeft('No more bookings for today.');
        return;
      }
      const nextBookingTime = new Date(`${bookingDate} ${bookings[nextBookingIndex].booked_timeSlot}:00`).getTime();
      const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        if (nextBookingTime < currentTime) {
          setTimeLeft('Timer has passed.');
          clearInterval(timer);
          setBookingDate(new Date(currentTime).toISOString().slice(0, 10));
        } else {
          const timeDiff = nextBookingTime - currentTime;
          const hours = Math.floor((timeDiff % (1000*60*60*24)) / (1000*60*60));
          const minutes = Math.floor((timeDiff % (1000*60*60)) / (1000*60));
          const seconds = Math.floor((timeDiff % (1000*60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeLeft('No bookings for today.');
    }
  }, [bookingDate, bookings]);

  useEffect(() => {
    if (timeLeft === 'Timer has passed.' || timeLeft === 'No more bookings for today.') {
      window.location.href = 'https://react-ts-agora-uikit.vercel.app/';
    }
  }, [timeLeft]);

  return (
    <div><br/>
    <h1 style={{textAlign:"center"}}>{<div> {timeLeft}</div>}</h1>  
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User Profile</th>
            <th>User Name</th>
            <th>Booking Date</th>
            <th>Booking Time</th>
            <th>Booking Status</th>
            <th>Navatar ID</th>
            <th>Appointment Status</th>
          </tr>
        </thead> 
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.booking_id}>
              <td>{booking.booked_id}</td>
              <td><img style={{width: "100%"}} src={booking.user_photo_url}></img></td>
              <td>{booking.user_name}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.booked_timeSlot}:00</td>
              <td>{booking.booked_status}</td>
              <td>{booking.navatar_id}</td>
              <td>{booking.appt_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListOfBooking;
