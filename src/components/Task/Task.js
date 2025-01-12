import { updateTask, deleteTask } from '../../services/taskService';
import { useState, useContext } from 'react';
import EditForm from './editForm';
import TaskContext from './context/TaskContext';
import { getProgress } from '../../services/taskService';
const Task = ({ task }) => {
  // const [task, setTask] = useState(initialTask);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { tasks, setTasks, setProgress } = useContext(TaskContext);

  const onStatusChange = async () => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      const data = {
        todo: {
          status: newStatus,
        },
      };
      await updateTask(task.id, data);
      setTasks(
        tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
      );
      const updatedProgress = await getProgress();
      setProgress(updatedProgress.data);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const onPriorityChange = async (value) => {
    try {
      const data = {
        todo: {
          priority: value,
        },
      };
      await updateTask(task.id, data);
      setTasks(
        tasks.map((t) => (t.id === task.id ? { ...t, priority: value } : t))
      );
      const updatedProgress = await getProgress();
      setProgress(updatedProgress.data);
    } catch (error) {
      console.error('Error updating task priority:', error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteTask(task.id);

      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));

      const updatedProgress = await getProgress();
      setProgress(updatedProgress.data);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const onEdit = () => {
    setIsModalOpen(true);
  };

  const onSave = async (updatedTask) => {
    try {
      const data = {
        todo: { title: updatedTask.title, priority: updatedTask.priority },
      };

      await updateTask(task.id, data);

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, ...updatedTask } : t))
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  if (!task) {
    return null;
  }

  return (
    <>
      <div className="flex w-2/3 border flex-col items-center p-3 rounded-md w-1/2 mb-3 opacity-65">
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex gap-2 text-left">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                id={task.id}
                checked={task.status === 'completed'}
                onChange={() => onStatusChange()}
              />
            </div>
            <div className="flex-col justify-start">
              <h2>{task.title}</h2>
              <label className="text-sm font-medium text-gray-400 dark:text-gray-500">
                {task.status}
              </label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative inline-block text-left">
              <select
                value={task.priority}
                onChange={(e) => onPriorityChange(e.target.value)}
                className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex gap-2 justify-between">
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
              <button
                onClick={() => onEdit()}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditForm
        task={task}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSave}
      />
    </>
  );
};

export default Task;
