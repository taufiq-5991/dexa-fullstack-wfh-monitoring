import React from 'react';
import axios from 'axios';

const ClockOutButton = () => {
  const handleClockOut = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/attendances/clock-out`, {}, {
        headers: { Authorization: `${token}` },
      });
      alert('Clock-out successful!');
      window.location.reload(); // Refresh the page to update the attendance list
    } catch (error) {
      console.error('Clock-out failed:', error);
      alert('Failed to clock out. Please try again.');
    }
  };

  return <button onClick={handleClockOut}>Clock Out</button>;
};

export default ClockOutButton;