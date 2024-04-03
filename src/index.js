import store from "./store"
import * as actions from './actionCreators'

store.subscribe(() => {
    console.log("State changed!")
})
store.dispatch(actions.bugAdded("Bug 1"))
store.dispatch(actions.bugAdded("Bug 1"))
store.dispatch(actions.bugAdded("Bug 1"))
store.dispatch(actions.bugResolved(1))

console.log(customStore.getState())