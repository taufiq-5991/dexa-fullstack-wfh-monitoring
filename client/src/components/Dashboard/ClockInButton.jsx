import React, { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

const ClockInButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateTime, setDateTime] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null); // Use useRef to manage the webcam reference
  const token = localStorage.getItem('token');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDateTime('');
    setPhoto(null);
    setError(null);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture the photo
    setPhoto(imageSrc); // Set the captured photo (base64 string)
  };

  const handleSubmit = async () => {
    try {
      const employeeId = JSON.parse(atob(token.split('.')[1])).employeeId; // Decode employeeId from token

      // Convert base64 to Blob
      const base64Response = await fetch(photo);
      const blob = await base64Response.blob();

      // Create a FormData object to send the photo and other data
      const formData = new FormData();
      formData.append('clockIn', dateTime);
      formData.append('employeeId', employeeId);
      formData.append('photo', new File([blob], 'photo.jpg', { type: 'image/jpeg' })); // Add photo as a file

      await axios.post(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_URL_VERSION}/attendances/clock-in`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      alert('Clock-in successful!');
      window.location.reload(); // Refresh the page to update the attendance list
    } catch (error) {
      console.error('Clock-in failed:', error);
      setError('Failed to clock in. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Clock In</button>

      {isModalOpen && (
        <div style={modalStyles}>
          <div style={modalContentStyles}>
            <h2>Clock In</h2>
            <label>
              Date & Time:
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </label>
            <div>
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                ref={webcamRef} // Attach the webcam reference
                style={{ marginTop: '10px', width: '25%' }}
              />
              <button onClick={handleCapture}>Capture Photo</button>
            </div>
            {photo && <img src={photo} alt="Captured" style={{ marginTop: '10px', width: '25%' }} />}
            <div style={{ marginTop: '20px' }}>
              <button onClick={handleSubmit}>Confirm</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

// Modal styles
const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
};

export default ClockInButton;