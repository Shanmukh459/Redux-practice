import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import  { createSelector } from 'reselect'
import { apiCallBegan } from "./api"
import moment from "moment"

let lastIndex = 0

const slice = createSlice({
    name: "bugs",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        bugsRequested: (bugs, action) => {
            bugs.loading = true
        },

        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false
        },

        bugsReceived: (bugs, action) => {
            bugs.list = action.payload
            bugs.loading = false
            bugs.lastFetch = Date.now()
        },

        bugAssignedToUser: (bugs, action) => {
            const { bugId, userId } = action.payload
            const index = bugs.list.findIndex(bug => bug.id === bugId)
            bugs.list[index].userId = userId
        },

        bugAdded: (bugs, action) => {
            bugs.list.push({
                id: ++lastIndex,
                description: action.payload.description,
                resolved: false,
            })
        },

        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
            bugs.list[index].resolved = true
        },

    }
})

export default slice.reducer
export const { 
    bugAdded, 
    bugResolved, 
    bugAssigned, 
    bugAssignedToUser, 
    bugsReceived,
    bugsRequested, 
    bugsRequestFailed,
} = slice.actions

const url = "/bugs"

export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

    if(diffInMinutes < 10) return
    console.log(lastFetch)

    dispatch(apiCallBegan({
        url,
        onStart: bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestFailed.type,
    }))
}
    
//selector
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => !bug.resolved)
)

export const getAssignedBugsToUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
)
    