import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState({
    completed: 0,
    pending: 0,
    percentage: 0,
  });

  return (
    <TaskContext.Provider value={{ tasks, setTasks, progress, setProgress }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
