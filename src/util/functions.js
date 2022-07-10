import { auth } from '../App.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { 
    setToDoTasks, 
    setDoingTasks, 
    setDoneTasks, 
    setDragIndex, 
    setDropIndex, 
    setDropIndexPosition, 
    setDragCard, 
    setDragCardLabel,
    setCardModalShow,
    setCardModalValues  
  } from '../redux/card.js';

// Regex Email

const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Authentication

export function handleSignIn(formValues, setFormErrors) {
    signInWithEmailAndPassword(auth, formValues.email, formValues.password)
        .then(() => {
            return window.location.replace("/dashboard")
        })
        .catch((err) => {
            if (err.message.includes("user-not-found")) {
                alert("Incorrect email or password")
            }
        })
};

// Forms

export function handleAuthFormInputChange(event, setFormValues, setFormErrors) {
    event.preventDefault();

    const {name, value} = event.target;

    if (value.length === 0) {
        setFormErrors((prevValues) => {
            return {
                ...prevValues,
                [name]: 'This field is required'
            }
        })
    } else {
        setFormErrors((prevValues) => {
            return {
                ...prevValues,
                [name]: ''
            }
        })
    }

    if (name === 'email') {
        if (!value.match(regexEmail)) {
            setFormErrors((prevValues) => {
                return {
                    ...prevValues,
                    email: 'Please enter a valid email'
                }
            })
        } else {
            setFormErrors((prevValues) => {
                return {
                    ...prevValues,
                    email: ''
                }
            })                
        }
    }

    setFormValues((prevValues) => {
        return {
            ...prevValues,
            [name]: value
        }
    })
};

// Cards

export function handleDragStart(index, children, label, dispatch) {
    dispatch(setDragIndex(index));
    dispatch(setDragCard(children));
    dispatch(setDragCardLabel(label));
}

export function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
}

export function handleDragEnterTop(event, styles, index, dispatch) {
    if (event.target === event.currentTarget) {
      event.target.classList.add(styles.DragActiveTop);
      dispatch(setDropIndex((index - 1)));
      dispatch(setDropIndexPosition("top"));
    }
};

export function handleDragEnterBottom(event, styles, index, dispatch) {
    if (event.target === event.currentTarget) {
      event.target.classList.add(styles.DragActiveBottom);
      dispatch(setDropIndex(index));
      dispatch(setDropIndexPosition("bottom"));
    }
};

export function handleDragLeaveTop(event, styles) {
    event.target.classList.remove(styles.DragActiveTop)
};

export function handleDragLeaveBottom(event, styles) {
    event.target.classList.remove(styles.DragActiveBottom)
};

export function handleDrop(event, styles, toDoTasks, doingTasks, doneTasks, dragIndex, dropIndex, selectedTaskGroup, dragCard, dragCardLabel, dropIndexPosition, dispatch) {
    event.target.classList.remove(styles.DragActiveTop)
    event.target.classList.remove(styles.DragActiveBottom)

    // remove card from originating task group list
    if (dragCardLabel === "To Do") {
      let updatedArr = toDoTasks.slice();
      updatedArr.splice(dragIndex, 1);
      dispatch(setToDoTasks(updatedArr));
    }
    if (dragCardLabel === "Doing") {
      let updatedArr = doingTasks.slice();
      updatedArr.splice(dragIndex, 1);
      dispatch(setDoingTasks(updatedArr));
    }
    if (dragCardLabel === "Done") {
      let updatedArr = doneTasks.slice();
      updatedArr.splice(dragIndex, 1);
      dispatch(setDoneTasks(updatedArr));
    }

    // Add card to selected task group list
    if (selectedTaskGroup === "To Do") {
      let updatedArr = toDoTasks.slice();
      if (dragCardLabel !== selectedTaskGroup) {
        updatedArr.splice((dropIndex + 1), 0 , dragCard);
      } else {
        updatedArr.splice(dragIndex, 1);
        if (dropIndexPosition === "top") {
          updatedArr.splice((dropIndex + 1), 0 , dragCard);
        } else if (dropIndexPosition === "bottom") {
          updatedArr.splice(dropIndex, 0 , dragCard);
        }
      }
      dispatch(setToDoTasks(updatedArr));
    }
    if (selectedTaskGroup === "Doing") {
      let updatedArr = doingTasks.slice();
      if (dragCardLabel !== selectedTaskGroup) {
        updatedArr.splice((dropIndex + 1), 0 , dragCard);
      } else {
        updatedArr.splice(dragIndex, 1);
        if (dropIndexPosition === "top") {
          updatedArr.splice((dropIndex + 1), 0 , dragCard);
        } else if (dropIndexPosition === "bottom") {
          updatedArr.splice(dropIndex, 0 , dragCard);
        }
      }
      dispatch(setDoingTasks(updatedArr));
    }
    if (selectedTaskGroup === "Done") {
      let updatedArr = doneTasks.slice();
      if (dragCardLabel !== selectedTaskGroup) {
        updatedArr.splice((dropIndex + 1), 0 , dragCard);
      } else {
        updatedArr.splice(dragIndex, 1);
        if (dropIndexPosition === "top") {
          updatedArr.splice((dropIndex + 1), 0 , dragCard);
        } else if (dropIndexPosition === "bottom") {
          updatedArr.splice(dropIndex, 0 , dragCard);
        }
      }
      dispatch(setDoneTasks(updatedArr));
    }
    
}

export function handleOpenModal(children, label, cardModal, dispatch) {
    let updatedObj = {...cardModal.values, title: children, status: label};
    dispatch(setCardModalValues(updatedObj));
    dispatch(setCardModalShow(true));
};