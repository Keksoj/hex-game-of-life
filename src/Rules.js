/**
 * These rules determine how an individual cells spawns, lives or dies 
 * depending on the number of alive neighbors.
 */
export default class Rules {
    constructor() {
        this.listOfRules = [
            { death: true, birth: false }, // zero live neighbor
            { death: true, birth: false }, // one live neighbor
            { death: true, birth: true }, // two live neighbors
            { death: false, birth: false }, // three live neighbors
            { death: true, birth: false }, // four live neighbors
            { death: true, birth: false }, // five live neighbors
            { death: true, birth: false }, // six live neighbors
        ];
    }

    getRuleForLiveNeighbors(liveNeighbors) {
        return this.listOfRules[liveNeighbors]
    }
}