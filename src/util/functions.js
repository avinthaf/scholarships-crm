import { auth } from '../App.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import {
    setTaskList, 
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

export function handleInputChange(event, setFormValues) {
    event.preventDefault();
    const { name, value } = event.target;

    setFormValues((prevValues) => {
        return {
            ...prevValues,
            [name]: value
        }
    })
};

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

export function createCard(tasks, label, dispatch) {
    let updatedArr = tasks[label].slice();
    // Insert new card with title 'Untitled'
    updatedArr.unshift({status: label, title: "Untitled", createdDate: getFormattedDateTime() });
    dispatch(setTaskList({
      status: label,
      value: updatedArr,
      createdDate: getFormattedDateTime()
    }))
};

// Kanban Functionality

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

export function handleDrop(event, styles, tasks, dragIndex, dropIndex, selectedTaskGroup, dragCardLabel, dropIndexPosition, dispatch) {
    event.target.classList.remove(styles.DragActiveTop)
    event.target.classList.remove(styles.DragActiveBottom)

    const { title, createdDate } = tasks[dragCardLabel][dragIndex];
    
    // remove card from originating task group list
    let updatedOriginArr = tasks[dragCardLabel].slice();
    updatedOriginArr.splice(dragIndex, 1);
    dispatch(setTaskList({
      status: dragCardLabel,
      value: updatedOriginArr
    }));

    // Add card to selected task group list
    let updatedRecipientArr = tasks[selectedTaskGroup].slice();
    if (dragCardLabel !== selectedTaskGroup) {
      updatedRecipientArr.splice((dropIndex + 1), 0 , { status: selectedTaskGroup, title: title, createdDate: createdDate });
    } else {
      updatedRecipientArr.splice(dragIndex, 1);
      if (dropIndexPosition === "top") {
        updatedRecipientArr.splice((dropIndex + 1), 0 , { status: selectedTaskGroup, title: title, createdDate: createdDate });
      } else if (dropIndexPosition === "bottom") {
        updatedRecipientArr.splice(dropIndex, 0 , { status: selectedTaskGroup, title: title, createdDate: createdDate });
      }
    }
    dispatch(setTaskList({
      status: selectedTaskGroup,
      value: updatedRecipientArr
    }));
    
}

export function handleOpenModal(index, children, label, createdDate, cardModal, dispatch) {
    let updatedObj = {...cardModal.values, index: index, title: children, status: label, createdDate: createdDate};
    dispatch(setCardModalValues(updatedObj));
    dispatch(setCardModalShow(true));
};

// Date and Time
export function getFormattedDateTime() {

    const today = new Date();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const date = today.getDate();
    
    const day = days[today.getUTCDay()];

    const month = months[today.getMonth()];

    const year = today.getFullYear();

    const time = `${(today.getHours() + 24) % 12 || 12}:${today.getMinutes()}`

    return `${day} ${month} ${date}, ${year} ${time} ${today.getHours() < 12 ? "AM" : "PM"}`
};