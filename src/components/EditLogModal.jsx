import React, { useState, useEffect } from 'react';

function EditLogModal({ isOpen, onClose, currentLog, onUpdate }) {
  const [logDetails, setLogDetails] = useState({
    content: '',
    duration: '',
    typeOfTraining: '',
    feedback: ''
  });

  useEffect(() => {
    if (currentLog) {
      setLogDetails({
        content: currentLog.content || '',
        duration: currentLog.duration || '',
        typeOfTraining: currentLog.typeOfTraining || '',
        feedback: currentLog.feedback || ''
      });
    }
  }, [currentLog]);

  if (!isOpen || !currentLog) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentLog || typeof currentLog._id !== 'string') {
      console.error("No current log or log ID (_id) is undefined.", currentLog);
      return;
    }
    console.log(currentLog)//
    onUpdate(currentLog._id, logDetails);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
      <h2>Edit Log</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="content"
          value={logDetails.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <input
          name="duration"
          value={logDetails.duration}
          onChange={handleChange}
          placeholder="Duration (in minutes)"
        />
        <input
          name="typeOfTraining"
          value={logDetails.typeOfTraining}
          onChange={handleChange}
          placeholder="Type of Training"
        />
        <textarea
          name="feedback"
          value={logDetails.feedback}
          onChange={handleChange}
          placeholder="Feedback"
        />
        <button type="submit">Save</button>
        <button onClick={onClose} type="button">Cancel</button>
      </form>
    </div>
  );
}

export default EditLogModal;
