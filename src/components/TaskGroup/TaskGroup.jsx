import styles from './TaskGroup.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTaskGroup } from '../../redux/card';

// Components
import Card from '../Card/Card.jsx';

// Util Functions
import { createCard } from '../../util/functions.js';

const TaskGroup = ({children, label}) => {

  // Redux
  const { tasks } = useSelector(state => state.card);
  const dispatch = useDispatch();

  // Functions
  function handleDragEnter() {
    dispatch(setSelectedTaskGroup(label))
  };

  return (
    <div className={styles.TaskGroup} onDragEnter={handleDragEnter}>
        <label>{label}</label>
        <div className={styles.CardsContainer}>
            <button onClick={() => createCard(tasks, label, dispatch)}>
                <img src="https://i3.lensdump.com/i/tLGkJe.png"/>
            </button>
            {tasks[label].length > 0 ? children : <Card empty/>}
        </div>
    </div>
  )
}

export default TaskGroup