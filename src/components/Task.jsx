import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => props.onToggleTask(props.id, props.isComplete)}
      >
        {props.title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => props.onDeleteTask(props.id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
