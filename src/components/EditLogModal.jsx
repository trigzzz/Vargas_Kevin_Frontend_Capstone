import React from 'react';

function EditLogModal({ isOpen, onClose, log, onUpdate }) {
  if (!isOpen || !log) return null;

  return (
    <div style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
      <h2>Edit Log</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onUpdate(log.id, e.target.elements.content.value);
        onClose();
      }}>
        <input name="content" defaultValue={log.content} />
        <button type="submit">Save</button>
        <button onClick={onClose} type="button">Cancel</button>
      </form>
    </div>
  );
}

export default EditLogModal;
