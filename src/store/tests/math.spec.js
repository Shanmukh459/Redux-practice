import { isEven } from "../../math";

describe("isEven", () => {
    it("should return true of given an even number", () => {
        const result = isEven(2)
        expect(result).toEqual(true)
    })
    
    it("should return false if given an odd number", () => {
        const result = isEven(3)
        expect(result).toEqual(false)
    })
})