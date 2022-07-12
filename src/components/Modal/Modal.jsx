import styles from './Modal.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { setTaskList } from '../../redux/card';

import _ from 'lodash';

const Modal = () => {
  // Redux
  const { cardModal, tasks } = useSelector(state => state.card);
  const { index, title, status, createdDate} = cardModal.values;
  const dispatch = useDispatch();

  // Functions

  let uniqueTaskLabelsArr = [];

  _.values(tasks).map((taskGroup) => {
    taskGroup.map(({status}) => {
      if (!uniqueTaskLabelsArr.includes(status)) {
        uniqueTaskLabelsArr.push(status)
      }
    })
  })

  function handleOnChange(event) {
    const {textContent} = event.currentTarget
    let updatedArr = tasks[status].slice();
    updatedArr.splice(index, 1, {
      status: status,
      title: textContent,
      createdDate: createdDate
    });
    dispatch(setTaskList({
      status: status,
      value: updatedArr
    }));
  };

  return (
    <div className={styles.Modal} onClick={(event) => event.stopPropagation()}>
      <div contentEditable onInput={(event) => handleOnChange(event)}>{title}</div>
      <div className={styles.Property}>
        <span>Date Created</span>
        <span>{createdDate}</span>
      </div>
      <div className={styles.Property}>
        <span>Status</span>
        <select>
          {
            uniqueTaskLabelsArr.map((label) => (
              <option selected={label === status}>{label}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}

export default Modal