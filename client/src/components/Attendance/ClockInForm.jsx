import React, { useState } from 'react';
import { clockIn } from '../../api/attendanceApi';

const ClockInForm = () => {
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);

    try {
      await clockIn(formData);
      alert('Clock-in successful!');
    } catch (error) {
      console.error('Clock-in failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      <button type="submit">Clock In</button>
    </form>
  );
};

export default ClockInForm;