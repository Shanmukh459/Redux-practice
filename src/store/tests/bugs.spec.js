import MockAdapter from "axios-mock-adapter"
import axios from "axios"
import { addBug } from "../bugs"
import configureStore from "../configureStore"

// describe("bugsSlice", () => {
//     it("should handle addBug action", async () => {
//         const store = configureStore()
//         const bug = { description: 'a'}
//         await store.dispatch(addBug(bug))
//         expect(store.getState().entities.bugs.list).toHaveLength(1)
//     })  
// })

describe("bugsSlice", () => {
    it("Should handle addbug action", async () => {
        const bug = { description: 'a'}
        const savedBug = { ...bug, id: 1}
        const fakeAxios = new MockAdapter(axios)
        fakeAxios.onPost('/bugs').reply(200, savedBug)

        const store = configureStore()
        await store.dispatch(addBug(bug))
        expect(store.getState().entities.bugs.list).toContainEqual(savedBug)

    })
})