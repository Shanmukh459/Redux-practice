import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"

let lastIndex = 0

const slice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {
        bugAdded: (bugs, action) => {
            bugs.push({
                id: ++lastIndex,
                description: action.payload.description,
                resolved: false
            })
        },

        bugResolved: (bugs, action) => {
            const index = bugs.findIndex(bug => bug.id === action.payload.id)
            bugs[index].resolved = true
        }
    }
})

export default slice.reducer
export const { bugAdded, bugResolved } = slice.actions
