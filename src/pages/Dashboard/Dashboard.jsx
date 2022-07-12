import styles from './Dashboard.module.css';

import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import _ from 'lodash';

// Layouts
import PageLayout from '../../layouts/PageLayoutSidebar';

// Components
import Card from '../../components/Card/Card';
import TaskGroup from '../../components/TaskGroup/TaskGroup';

const Dashboard = ({user}) => {

  // Redux
  const { tasks } = useSelector(state => state.card);

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
            {
              _.values(tasks).map((taskGroup, taskGroupIndex) => (
                <TaskGroup key={taskGroupIndex} label={Object.keys(tasks)[taskGroupIndex]}>
                  {
                    taskGroup.map((task, taskIndex) => (
                      <Card
                      key={taskIndex} 
                      index={taskIndex}
                      label={Object.keys(tasks)[taskGroupIndex]}
                      createdDate={task.createdDate}>
                        {task.title}
                      </Card>
                    ))
                  }
                </TaskGroup>
              ))
            }
          </main>
        </div>
    </PageLayout>
  )
}

export default Dashboard