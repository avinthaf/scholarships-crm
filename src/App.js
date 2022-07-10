import './App.css';

import { useEffect } from 'react';

import { Route } from "wouter";

import { app } from './firebase/firebase-config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "./redux/auth.js";
import { setToDoTasks, setDoingTasks, setDoneTasks } from "./redux/card.js";

// Pages
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

export const auth = getAuth(app);

function App() {

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user => {
      if (user) {
        dispatch(setUser(user.uid))
        dispatch(setToDoTasks(["Task 1", "Task 2", "Task 3"]))
        dispatch(setDoingTasks(["Task 4", "Task 5", "Task 6"]))
        dispatch(setDoneTasks(["Task 7", "Task 8", "Task 9"]))
      } else {
        dispatch(setUser(null))
        dispatch(setToDoTasks([]))
        dispatch(setDoingTasks([]))
        dispatch(setDoneTasks([]))
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
