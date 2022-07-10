import styles from './TaskGroup.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTaskGroup } from '../../redux/card';

const TaskGroup = ({children, label}) => {

  // Redux
  const { selectedTaskGroup } = useSelector(state => state.card);
  const dispatch = useDispatch();

  // Functions
  function handleDragEnter() {
    dispatch(setSelectedTaskGroup(label))
  }

  return (
    <div className={styles.TaskGroup} onDragEnter={handleDragEnter}>
        <label>{label}</label>
        <div className={styles.CardsContainer}>
            <button>
                <img src="https://i3.lensdump.com/i/tLGkJe.png"/>
            </button>
            {children}
        </div>
    </div>
  )
}

export default TaskGroup