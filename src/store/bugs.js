// Action types
const BUG_ADDED = "bugAdded"
const BUG_REMOVED = "bugRemoved"
const BUG_RESOLVED = "bugResolved"


//ActionCreators
export function bugAdded(description) {
    return {
        type: BUG_ADDED,
        payload: {
            description: description
        }
    }
}

export function bugResolved(bugId) {
    return {
        type: BUG_RESOLVED,
        payload: {
            id: bugId
        }
    }
}

//Reducer
let lastIndex = 0
export default function reducer(state = [], action) {
    if(action.type === BUG_ADDED)
        return [
            ...state,
            {
                id: ++lastIndex,
                description: action.payload.description,
                resolved: false
            }
        ]
    else if(action.type === BUG_REMOVED)
        return state.filter(bug => bug.id !== action.payload.id)

    else if(action.type === BUG_RESOLVED)
        return state.map(bug => bug.id === action.payload.id ? {...bug, resolved:true} : bug)

    return state
}