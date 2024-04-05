import configureStore from "./store/configureStore"
import { bugAdded, bugResolved, getUnresolvedBugs } from './store/bugs'
import { projectAdded } from './store/projects'
// import reducer from "./store/reducer"



const store = configureStore()
store.subscribe(() => {
    console.log("State changed!")
})

console.log(store)

store.dispatch(bugAdded({description: "Bug 1"}))
store.dispatch(bugAdded({description: "Bug 2"}))
store.dispatch(bugAdded({description: "Bug 3"}))
store.dispatch(bugResolved({ id: 1}))

store.dispatch(projectAdded({name: "Project 1"}))
store.dispatch(projectAdded({name: "Project 2"}))

const unresolvedBugs = getUnresolvedBugs(store.getState())
console.log(unresolvedBugs)
// console.log(store.getState())