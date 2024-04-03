import { createAction, createReducer } from "@reduxjs/toolkit"

export const bugAdded = createAction("bugAdded")
export const bugRemoved = createAction("bugRemoved")
export const bugResolved = createAction("bugResolved")

//Reducer
let lastIndex = 0

export default createReducer([], {
    //key: value
    //action: function (event => event handlers)
    [bugAdded.type]: (bugs, action) => {
        bugs.push({
            id: ++lastIndex,
            description: action.payload.description,
            resolved: false
        })
    },

    [bugResolved.type]: (bugs, action) => {
        const index = bugs.findIndex(bug => bug.id === action.payload.id)
        bugs[index].resolved = true
    }
})
export function reducer(state = [], action) {
    if(action.type === bugAdded.type)
        return [
            ...state,
            {
                id: ++lastIndex,
                description: action.payload.description,
                resolved: false
            }
        ]
    else if(action.type === bugRemoved.type)
        return state.filter(bug => bug.id !== action.payload.id)

    else if(action.type === bugResolved.type)
        return state.map(bug => bug.id === action.payload.id ? {...bug, resolved:true} : bug)

    return state
}