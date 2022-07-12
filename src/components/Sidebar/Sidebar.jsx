import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.Sidebar}>
      <div>
        <div className={styles.UserPic}></div>
        <ul>
          <li>New Plan</li>
          <li>Hub</li>
          <li>Assigned to me</li>
        </ul>
        <div>
          <span>All</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar