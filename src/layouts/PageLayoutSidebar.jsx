import styles from './PageLayoutSidebar.module.css';

// Components
import Sidebar from '../components/Sidebar/Sidebar';
import Backdrop from '../components/Modal/Backdrop';
import Modal from '../components/Modal/Modal';

const PageLayout = (props) => {

  const {children, gray} = props;
  return (
    <div className={styles.PageLayout} style={{ backgroundColor: gray ? "#E9EDF0" : "FFF", minHeight: props.autoSizing? "0" : "100vh" }}>
        <Sidebar />
        <div className={styles.PageContent}>
          {children}
        </div>
        <Backdrop>
            <Modal/>
        </Backdrop>
    </div>
  )
}

export default PageLayout