import styles from './Login.module.css';

import { useState } from 'react';

import { Link } from "wouter";

// Util Functions
import { handleAuthFormInputChange, handleSignIn } from '../../util/functions';

const Login = () => {

  // State
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  }); 

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: ""
  }); 

  return (
    <div className={styles.Login}>
        <div className={styles.Brand}></div>
        <div className={styles.FormContainer}>
            <form onSubmit={(event) => event.preventDefault()}>
                <h1>Login</h1>
                <h2>Manage all of your applications</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor aspernatur blanditiis, quo doloremque optio quibusdam, accusamus maiores magni, provident sapiente nesciunt. Ullam temporibus eligendi ab maxime dolores tenetur velit optio.</p>
                <label>Email</label>
                <input
                className={formErrors.email? "ErrorInput" : ""}  
                type="text" 
                name="email" 
                value={formValues.email} 
                placeholder="me@example.com"
                onChange={(event) => handleAuthFormInputChange(event, setFormValues, setFormErrors)}/>
                <div className="Error">
                    {
                        formErrors.email?
                        <>
                            <img src="https://i1.lensdump.com/i/telwAx.png" width="16px" /><span>{formErrors.email}</span>
                        </>
                        :
                        null
                    }
                </div>
                <label>Password</label>
                <input
                className={formErrors.password? "ErrorInput" : ""}  
                type="password" 
                name="password" 
                value={formValues.password}
                onChange={(event) => handleAuthFormInputChange(event, setFormValues, setFormErrors)}/>
                <div className="Error">
                    {
                        formErrors.password?
                        <>
                            <img src="https://i1.lensdump.com/i/telwAx.png" width="16px" /><span>{formErrors.password}</span>
                        </>
                        :
                        null
                    }
                </div>
                <button className="BlueButton" onClick={() => handleSignIn(formValues, setFormErrors)}>Sign in</button>
                <span>Don't have an account yet? <Link href="/register">Register</Link></span>
            </form>
        </div>
        <div className={styles.Hero}>

        </div>
    </div>
  )
}

export default Login