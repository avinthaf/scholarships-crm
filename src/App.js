import './App.css';

import { useEffect } from 'react';

import { Route } from "wouter";

import { app } from './firebase/firebase-config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "./redux/auth.js";
import { setTasks } from "./redux/card.js";

// Pages
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

export const auth = getAuth(app);

// Modelling Database
const tasks = [
  {
    status: "To Do",
    title: "Task 1",
    createdDate: "Mon Jul 11, 5:45 PM"
  },
  {
    status: "To Do",
    title: "Task 7",
    createdDate: "Sat Jul 09, 1:25 PM"
  },
  {
    status: "Doing",
    title: "Task 2",
    createdDate: "Sat Jul 09, 1:25 PM"
  },
  {
    status: "Done",
    title: "Task 3",
    createdDate: "Mon Jul 11 11:45 AM"
  },
  
];

let sortedTasksObj = {};

tasks.map((task) => {
  if (sortedTasksObj[task.status]) {
    sortedTasksObj[task.status].push(task);
  } else {
    sortedTasksObj[task.status] = [];
    sortedTasksObj[task.status].push(task);
  }
});

function App() {

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user => {
      if (user) {
        dispatch(setUser(user.uid))
        dispatch(setTasks(sortedTasksObj))
      } else {
        dispatch(setUser(null))
        dispatch(setTasks(null))
      }
    }))
  }, [auth]);

  return (
    <div className="App">
      <Route path="/login" component={Login}/>
      <Route path="/dashboard" component={() => <Dashboard user={user}/>}/>
    </div>
  );
}

export default App;
