import configureStore from "./store/configureStore"
import * as actions from './store/bugs'
import { projectAdded } from './store/projects'
import { reducer } from "./store/reducer"



const store = configureStore(reducer)
store.subscribe(() => {
    console.log("State changed!")
})

console.log(store)

store.dispatch(actions.bugAdded({description: "Bug 1"}))
store.dispatch(actions.bugAdded({description: "Bug 2"}))
store.dispatch(actions.bugAdded({description: "Bug 3"}))
store.dispatch(actions.bugResolved({ id: 1}))

store.dispatch(projectAdded({name: "Project 1"}))
store.dispatch(projectAdded({name: "Project 2"}))

const unresolvedBugs = store.getState().entities.bugs.filter(bug => !bug.resolved)
console.log(unresolvedBugs)
console.log(store.getState())