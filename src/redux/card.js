import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toDoTasks: [],
    doingTasks: [],
    doneTasks: [],
    dragIndex: null,
    dropIndex: null,
    dropIndexPosition: "top",
    dragCard: null,
    dragCardLabel: null,
    selectedTaskGroup: null,
    cardModal: {
        show: false,
        values: {
            title: "",
            status: "",
            createdDate: ""
        }
    }
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setToDoTasks: (state, action) => {
            state.toDoTasks = action.payload
        },
        setDoingTasks: (state, action) => {
            state.doingTasks = action.payload
        },
        setDoneTasks: (state, action) => {
            state.doneTasks = action.payload
        },
        setDragIndex: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.dragIndex = action.payload

        },
        setDropIndex: (state, action) => {
            state.dropIndex = action.payload

        },
        setDropIndexPosition: (state, action) => {
            state.dropIndexPosition = action.payload
        },
        setDragCard: (state, action) => {
            state.dragCard = action.payload
        },
        setDragCardLabel: (state, action) => {
            state.dragCardLabel = action.payload
        },
        setSelectedTaskGroup: (state, action) => {
            state.selectedTaskGroup = action.payload
        },
        setCardModalShow: (state, action) => {
            state.cardModal.show = action.payload
        },
        setCardModalValues: (state, action) => {
            state.cardModal.values = action.payload
        }
    }
});

// Action creators are generated for each case reducer function
export const { 
    setToDoTasks, 
    setDoingTasks, 
    setDoneTasks, 
    setDragIndex, 
    setDropIndex,
    setDropIndexPosition, 
    setDragCard, 
    setDragCardLabel, 
    setSelectedTaskGroup,
    setCardModalShow,
    setCardModalValues 
} = cardSlice.actions

export default cardSlice.reducer
