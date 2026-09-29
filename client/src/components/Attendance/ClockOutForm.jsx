import React, { useState } from 'react';
import { clockOut } from '../../api/attendanceApi';

const ClockOutForm = () => {
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);

    try {
      await clockOut(formData);
      alert('Clock-out successful!');
    } catch (error) {
      console.error('Clock-out failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      <button type="submit">Clock Out</button>
    </form>
  );
};

export default ClockOutForm;