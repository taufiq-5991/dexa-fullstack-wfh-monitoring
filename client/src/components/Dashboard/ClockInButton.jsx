import React from 'react';
import axios from 'axios';

const ClockInButton = () => {
  const handleClockIn = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/attendances/clock-in`, {}, {
        headers: { Authorization: `${token}` },
      });
      alert('Clock-in successful!');
      window.location.reload(); // Refresh the page to update the attendance list
    } catch (error) {
      console.error('Clock-in failed:', error);
      alert('Failed to clock in. Please try again.');
    }
  };

  return <button onClick={handleClockIn}>Clock In</button>;
};

export default ClockInButton;