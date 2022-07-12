import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: {},
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
        setTasks: (state, {payload}) => {
            if (payload === null) {
                state.tasks = {
                    toDo: [],
                    doing: [],
                    done: []
                }
            } else {
                state.tasks = payload
            }
        },
        setTaskList: (state, {payload}) => {
            state.tasks[payload.status] = payload.value
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
    setTasks,
    setTaskList,  
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
