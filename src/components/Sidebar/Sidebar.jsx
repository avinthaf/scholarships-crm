import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.Sidebar}>
      <div>
        <div className={styles.UserPic}></div>
      </div>
    </aside>
  )
}

export default Sidebar