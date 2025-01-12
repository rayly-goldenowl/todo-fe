import { getAllTask } from '../../services/taskService';
import Task from './Task';
import { useState, useEffect, useContext } from 'react';
import CreateTask from './CreateTask';
import { createTaskk, getProgress } from '../../services/taskService';
import TaskContext from './context/TaskContext';
const ListTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, setTasks, progress, setProgress } = useContext(TaskContext);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTask();
        setTasks(response);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await getProgress();
        setProgress(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };  
    fetchProgress();
    fetchTasks();
  }, [setTasks, setProgress]);

  const handleCreateTask = async (newTask) => {
    try {
      const newT = await createTaskk(newTask);
      console.log('New Task:', newT);
      setTasks([...tasks, newT.data.todo]);
      const updatedProgress = await getProgress();
      setProgress(updatedProgress.data);
    } catch (error) {
      console.error('Error create task:', error);
    }
  };

  return (
    <>
      <div className="flex gap-5 py-5 ">
        <div className="flex-col text-center w-full gap-5">
          <p>Completed</p>
          <p>{progress.completed}</p>
        </div>

        <div className="flex-col text-center w-full gap-5">
          <p>Pending</p>
          <p>{progress.pending}</p>
        </div>

        <div className="flex-col text-center w-full gap-5">
          <p>Progress</p>
          <p>{progress.percentage} %</p>
        </div>
      </div>

      <div className="flex flex-col w-full h-screen items-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded mb-4"
        >
          Create Task
        </button>
        {tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
      <CreateTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </>
  );
};

export default ListTask;
