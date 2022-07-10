import styles from './Dashboard.module.css';

import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

// Layouts
import PageLayout from '../../layouts/PageLayoutSidebar';

// Components
import Card from '../../components/Card/Card';
import TaskGroup from '../../components/TaskGroup/TaskGroup';

const Dashboard = ({user}) => {

  // Redux
  const { toDoTasks, doingTasks, doneTasks } = useSelector(state => state.card);

  // State   
  const [loading, setLoading] = useState(false);

  // On Component Mount
  useEffect(() => {
    setLoading(true)
    if (user) {
        setLoading(false)
    } else {
        window.location.replace("/login")
    }
  }, [setLoading]);   

  if (loading) return "Loading..."

  return (
    <PageLayout gray>
        <div className={styles.Dashboard}>
          <header>
            <h2>Good morning, John!</h2>
            <h1>Let's get things done!</h1>
          </header>
          <main>
            <TaskGroup label="To Do">
              {
                toDoTasks.map((task, index) => <Card 
                key={index} 
                index={index}
                label="To Do"
                >{task}</Card>)
              }
            </TaskGroup>
            <TaskGroup label="Doing">
              {
                doingTasks.map((task, index) => <Card 
                key={index} 
                index={index}
                label="Doing"
                >{task}</Card>)
              }
            </TaskGroup>
            <TaskGroup label="Done">
            {
                doneTasks.map((task, index) => <Card 
                key={index} 
                index={index}
                label="Done"
                >{task}</Card>)
              }
            </TaskGroup>
          </main>
        </div>
    </PageLayout>
  )
}

export default Dashboard