import { range } from "./utils"
import { pluck } from "./utils"

describe('utils', () => {
    describe('sample test', () => {
        it('simple test', () => {
            expect(1).toBe(1)
        })
    })
    describe('range', () => {
        it('returns correct range from 1 to 5', () => {
            expect(range(1, 5)).toEqual([1, 2, 3, 4])
        })
        it('returns correct range from -3 to 3', () => {
            expect(range(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2])
        })
    })
    describe('pluck', () => {
        const data = [
            { id: 1, name: "john" },
            { id: 2, name: "doe" },
            { id: 3, name: "mark" }
        ]
        it('returns correct ids', () => {
            expect(pluck(data, 'id')).toEqual([1, 2, 3])
        })
        it('returns correct names', () => {
            expect(pluck(data, 'name')).toEqual(['john', 'doe', 'mark'])
        })
    })
})