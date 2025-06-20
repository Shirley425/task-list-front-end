import { useState } from 'react';
import './NewTaskForm.css';

const NewTaskForm = ({ onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === '') return;

    const newTask = {
      title,
      description,
      completed_at: null,
    };

    onCreateTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default NewTaskForm;