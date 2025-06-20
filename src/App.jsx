import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BasicUrl = import.meta.env.VITE_BASE_URL;

const App = () => {
  // Usestate moved from Task.jsx
  const [tasks, setTasks] = useState([]);

const normalizeTasks = (data) => {
  return data.map((task) => ({
    ...task,
    isComplete: task.is_complete
  }));
};

  useEffect(() => {
    axios.get(`${BasicUrl}/tasks`)
      .then((response) => {
        setTasks(normalizeTasks(response.data));
      })
      .catch((error) => {
        console.log('Error getting tasks:', error);
      });
  }, []);

  const createTask = (newTask) => {
  axios.post(`${BasicUrl}/tasks`, newTask)
    .then(() => axios.get(`${BasicUrl}/tasks`))
    .then((response) => {
      setTasks(normalizeTasks(response.data));
    })
    .catch((error) => {
      console.error("Error creating new task:", error);
    });
};

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
        setTasks(normalizeTasks(response.data));
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
        setTasks(normalizeTasks(response.data));
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
        <NewTaskForm onCreateTask={createTask} />
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