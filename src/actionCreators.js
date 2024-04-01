import * as actions from "./actionTypes"

export function bugAdded(description) {
    return {
        type: actions.BUG_ADDED,
        payload: {
            description: description
        }
    }
}

export function bugResolved(bugId) {
    return {
        type: actions.BUG_RESOLVED,
        payload: {
            id: bugId
        }
    }
}