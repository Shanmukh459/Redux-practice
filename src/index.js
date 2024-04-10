import configureStore from "./store/configureStore"
import { bugAdded, bugAssigned, bugAssignedToUser, bugResolved, getAssignedBugsToUser, getUnresolvedBugs } from './store/bugs'
import { projectAdded } from './store/projects'
import { userAdded } from "./store/users"

const store = configureStore()
store.subscribe(() => {
    console.log("State changed!")
})

console.log(store)

store.dispatch(userAdded({ name: "user 1"}))
store.dispatch(userAdded({ name: "user 2"}))

store.dispatch(bugAdded({description: "Bug 1"}))
store.dispatch(bugAdded({description: "Bug 2"}))
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1}))
store.dispatch(bugAdded({description: "Bug 3"}))
store.dispatch(bugResolved({ id: 1}))

store.dispatch(projectAdded({name: "Project 1"}))
store.dispatch(projectAdded({name: "Project 2"}))

// store.dispatch(bugAssigned({ id: 1, user: "user 1"}))

const assignedBugs = getAssignedBugsToUser(1)(store.getState())
console.log(assignedBugs)
console.log(store.getState())