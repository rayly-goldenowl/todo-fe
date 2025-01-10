import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import { Link, Outlet } from 'react-router-dom';
import { TaskProvider } from './components/Task/context/TaskContext';
export default function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>

      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <TaskProvider>
            <Outlet />
          </TaskProvider>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
