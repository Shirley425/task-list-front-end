import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      );
    });
  };
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;
