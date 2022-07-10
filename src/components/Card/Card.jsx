import styles from './Card.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { 
  setToDoTasks, 
  setDoingTasks, 
  setDoneTasks, 
  setDragIndex, 
  setDropIndex, 
  setDropIndexPosition, 
  setDragCard, 
  setDragCardLabel,
  setCardModalShow,
  setCardModalValues  
} from '../../redux/card.js';

// Util Functions
import { handleDragStart, handleDragOver, handleDragEnterTop, handleDragEnterBottom, handleDragLeaveTop, handleDragLeaveBottom, handleDrop, handleOpenModal } from '../../util/functions.js';

const Card = ({children, index, label}) => {

  // Redux
  const { 
    toDoTasks, 
    doingTasks, 
    doneTasks, 
    dragIndex, 
    dropIndex, 
    dropIndexPosition, 
    dragCard, 
    dragCardLabel, 
    selectedTaskGroup,
    cardModal 
  } = useSelector(state => state.card);
  const dispatch = useDispatch();

  return (
    <div 
    className={styles.Card} 
    draggable
    onClick={() => handleOpenModal(children, label, cardModal, dispatch)}
    onDragStart={() => handleDragStart(index, children, label, dispatch)}
    onDragOver={(event) => handleDragOver(event)}
    onDrop={(event) => handleDrop(event, styles, toDoTasks, doingTasks, doneTasks, dragIndex, dropIndex, selectedTaskGroup, dragCard, dragCardLabel, dropIndexPosition, dispatch)}
    >
      <div 
      className={styles.Top}
      onDragEnter={(event) => handleDragEnterTop(event, styles, index, dispatch)}
      onDragLeave={(event) => handleDragLeaveTop(event, styles)}></div>
      <span>{children}</span>
      <div 
      className={styles.Bottom} 
      onDragEnter={(event) => handleDragEnterBottom(event, styles, index, dispatch)}
      onDragLeave={(event) => handleDragLeaveBottom(event, styles)}></div>
    </div>
  )

}

export default Card