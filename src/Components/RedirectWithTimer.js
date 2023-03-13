import React, { useEffect } from 'react';

const RedirectWithTimer = ({ link, delay }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = link;
    }, delay);

    return () => clearTimeout(timer);
  }, [link, delay]);

  return <div>You will be in Navatar call by {delay / 1000} seconds...</div>;
};

export default RedirectWithTimer;