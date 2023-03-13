import React, { useState, useEffect } from 'react';

const RedirectWithTimer = ({ link, delay }) => {
  const [timeLeft, setTimeLeft] = useState(delay);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      window.location.href = link;
    }
  }, [timeLeft, link]);

  const secondsLeft = Math.ceil(timeLeft / 1000);

  return <div>Doctor will be in Navatar call by {secondsLeft} seconds...</div>;
};

export default RedirectWithTimer;
