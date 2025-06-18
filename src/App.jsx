import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const BasicUrl = 'http://127.0.0.1:5001';
// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  // Usestate moved from Task.jsx
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${BasicUrl}/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log('Error getting tasks:', error);
      });
  }, []);

  //  Button change  when task is complete
  const toggleTaskisComplete = (id, isComplete) => {
    const url = isComplete
      ? `${BasicUrl}/tasks/${id}/mark_incomplete`
      : `${BasicUrl}/tasks/${id}/mark_complete`;
    axios.patch(url)
      .then(() => {
        return axios.get(`${BasicUrl}/tasks`);
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error updating task status:', error);
      });
  };

  // Task delete
  const deleteTask = (id) => {
    axios.delete(`${BasicUrl}/tasks/${id}`)
      .then(() => {
        return axios.get(`${BasicUrl}/tasks`);
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTaskisComplete}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  );
};


export default App;