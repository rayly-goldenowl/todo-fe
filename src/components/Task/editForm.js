import React, { useState, useEffect } from 'react';

const EditForm = ({ task, isOpen, onClose, onSave }) => {
  const [editTask, setEditTask] = useState({ ...task });

  useEffect(() => {
    if (isOpen) {
      setEditTask({ ...task });
    }
  }, [isOpen, task]);

  const onModalChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editTask);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h3>Edit Task</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={editTask.title}
            onChange={onModalChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            name="priority"
            value={editTask.priority}
            onChange={onModalChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white p-2 rounded-md"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black p-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
