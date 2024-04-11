import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import  { createSelector } from 'reselect'

let lastIndex = 0

const slice = createSlice({
    name: "bugs",
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
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
export const { bugAdded, bugResolved, bugAssigned, bugAssignedToUser } = slice.actions

//selector
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => !bug.resolved)
)

export const getAssignedBugsToUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
)
    