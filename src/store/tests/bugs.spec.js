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
    let fakeAxios
    let store

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios)
        store = configureStore()
    })

    const bugSlice = () => store.getState().entities.bugs

    it("Should add the bug to the store if it's saved to the server", async () => {
        //Arrange
        const bug = { description: 'a'}
        const savedBug = { ...bug, id: 1}
        fakeAxios.onPost('/bugs').reply(200, savedBug)

        //Act
        await store.dispatch(addBug(bug))

        //Assert
        expect(bugSlice().list).toContainEqual(savedBug)

    })
    it("Should not add the bug to the store if it's not saved to the server", async () => {
        //Arrange
        const bug = { description: 'a'}
        fakeAxios.onPost('/bugs').reply(500)

        //Act
        await store.dispatch(addBug(bug))

        //Assert
        expect(bugSlice().list).toHaveLength(0)

    })
})