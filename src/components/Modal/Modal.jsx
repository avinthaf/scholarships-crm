import styles from './Modal.module.css';

import { useSelector } from 'react-redux';

const Modal = () => {
  // Redux
  const { cardModal } = useSelector(state => state.card);
  const { values } = cardModal;

  return (
    <div className={styles.Modal}>
      <h1>{values.title}</h1>
      <span>{values.status}</span>
    </div>
  )
}

export default Modal