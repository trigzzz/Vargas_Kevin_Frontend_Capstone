import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWorkoutLogs,
  createWorkoutLog,
  updateWorkoutLog,
  deleteWorkoutLog
} from '../features/workoutLogs/workoutLogsSlice';
import EditLogModal from '../components/EditLogModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLog, setCurrentLog] = useState({});
  const [newLogContent, setNewLogContent] = useState('');
  const [newLogDuration, setNewLogDuration] = useState('');
  const [newLogTypeOfTraining, setNewLogTypeOfTraining] = useState('');
  const [newLogFeedback, setNewLogFeedback] = useState('');
  const dispatch = useDispatch();
  const { logs, status } = useSelector((state) => state.workoutLogs);

  useEffect(() => {
    dispatch(fetchWorkoutLogs());
  }, [dispatch]);

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLogContent.trim()) {
      toast.error('Log content cannot be empty.');
      return;
    }
    const logData = {
      content: newLogContent,
      duration: newLogDuration,
      typeOfTraining: newLogTypeOfTraining,
      feedback: newLogFeedback,
    };
    dispatch(createWorkoutLog(logData));
    setNewLogContent('');
    setNewLogDuration('');
    setNewLogTypeOfTraining('');
    setNewLogFeedback('');
    toast.success('Log added successfully');
  };

  const handleEditClick = (log) => {
    setCurrentLog(log);
    setIsModalOpen(true);
  };

  const handleUpdateLog = (id, logData) => {
    dispatch(updateWorkoutLog({ id, logData }));
    setIsModalOpen(false);
    toast.success('Log updated successfully');
  };

  const handleDeleteLog = (id) => {
    dispatch(deleteWorkoutLog(id))
      .unwrap()
      .then(() => {
        toast.success('Log deleted successfully');
      })
      .catch((error) => {
        console.error("Error deleting log:", error);
        toast.error(`Error deleting log: ${error.message || 'Unknown error'}`);
      });
  };

  return (
    <div>
      <ToastContainer />
      <h1>Dashboard</h1>
      <form onSubmit={handleAddLog}>
        <input
          type="text"
          placeholder="New Log Content"
          value={newLogContent}
          onChange={(e) => setNewLogContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration (in minutes)"
          value={newLogDuration}
          onChange={(e) => setNewLogDuration(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type of Training"
          value={newLogTypeOfTraining}
          onChange={(e) => setNewLogTypeOfTraining(e.target.value)}
        />
        <textarea
          placeholder="Feedback"
          value={newLogFeedback}
          onChange={(e) => setNewLogFeedback(e.target.value)}
        />
        <button type="submit">Add Log</button>
      </form>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error fetching logs.</p>}
      
      {logs.map(log => (
        <div key={log.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>{log.title || "Workout Log"}</h3>
          <p>{log.content}</p>
          <p>Date: {new Date(log.date).toLocaleDateString()}</p>
          <p>Duration: {log.duration} minutes</p>
          <p>Type of Training: {log.typeOfTraining}</p>
          <p>Feedback: {log.feedback}</p>
          <button onClick={() => handleEditClick(log)}>Edit</button>
          <button onClick={() => handleDeleteLog(log._id)} style={{ marginLeft: "10px" }}>Delete</button>
        </div>
      ))}

      <EditLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        log={currentLog}
        onUpdate={handleUpdateLog}
      />
    </div>
  );
}

export default DashboardPage;
