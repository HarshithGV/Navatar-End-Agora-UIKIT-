import React, { useEffect } from 'react';

const RedirectWithTimer = ({ link, delay }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = link;
    }, delay);

    return () => clearTimeout(timer);
  }, [link, delay]);

  return <div>You will be redirected to {link} in {delay / 1000} seconds...</div>;
};

export default RedirectWithTimer;