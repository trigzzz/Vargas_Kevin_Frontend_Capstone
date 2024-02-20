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
    dispatch(createWorkoutLog({ content: newLogContent }));
    setNewLogContent('');
    toast.success('Log added successfully');
  };

  const handleEditClick = (log) => {
    setCurrentLog(log);
    setIsModalOpen(true);
  };

  const handleUpdateLog = (id, content) => {
    if (!content.trim()) {
      toast.error('Log content cannot be empty.');
      return;
    }
    dispatch(updateWorkoutLog({ id, logData: { content } }));
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
        <button type="submit">Add Log</button>
      </form>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error fetching logs.</p>}
      
      {logs.map(log => (
        <div key={log.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>{log.title || "Workout Log"}</h3> {/*  title */}
          <p>{log.content}</p>
          <p>Date: {new Date(log.date).toLocaleDateString()}</p> {/* date */}
          <p>Duration: {log.duration} minutes</p> { /* duration */}
          <p>Type of Training: {log.typeOfTraining}</p> {/*  type of training */}
          <p>Feedback: {log.feedback}</p> {/* feedback */}
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
