import styles from './Backdrop.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { setCardModalShow } from '../../redux/card';

const Backdrop = (props) => {

  // Redux
  const { cardModal } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const {children} = props;

  return (
    <div className={styles.Backdrop} style={{display: cardModal.show? "flex" : "none"}} onClick={() => dispatch(setCardModalShow(false))}>
        {children}
    </div>
  )
}

export default Backdrop