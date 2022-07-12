import styles from './Card.module.css';

import { useSelector, useDispatch } from 'react-redux';

// Util Functions
import { 
  handleDragStart, 
  handleDragOver, 
  handleDragEnterTop, 
  handleDragEnterBottom, 
  handleDragLeaveTop, 
  handleDragLeaveBottom, 
  handleDrop, 
  handleOpenModal
} from '../../util/functions.js';

const Card = ({empty, children, index, label, createdDate}) => {

  // Redux
  const {
    tasks, 
    dragIndex, 
    dropIndex, 
    dropIndexPosition, 
    dragCardLabel, 
    selectedTaskGroup,
    cardModal 
  } = useSelector(state => state.card);
  const dispatch = useDispatch();

  return (
    <div 
    className={`${styles.Card} ${empty ? styles.EmptyCard : ""}`} 
    draggable
    onClick={() => handleOpenModal(index, children, label, createdDate, cardModal, dispatch)}
    onDragStart={() => handleDragStart(index, children, label, dispatch)}
    onDragOver={(event) => handleDragOver(event)}
    onDrop={(event) => handleDrop(event, styles, tasks, dragIndex, dropIndex, selectedTaskGroup, dragCardLabel, dropIndexPosition, dispatch)}
    >
      <div 
      className={styles.Top}
      onDragEnter={(event) => handleDragEnterTop(event, styles, index, dispatch)}
      onDragLeave={(event) => handleDragLeaveTop(event, styles)}></div>
      <span>{children}</span>
      <div 
      className={styles.Bottom}
      style={{ display: empty ? "none" : "block" }} 
      onDragEnter={(event) => handleDragEnterBottom(event, styles, index, dispatch)}
      onDragLeave={(event) => handleDragLeaveBottom(event, styles)}></div>
    </div>
  )

}

export default Card