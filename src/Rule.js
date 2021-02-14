//liveNeighbors: number
// death / birth: Boolean

export default class Rule {
    constructor(liveNeighbors, death, birth) {
        this.liveNeighbors = liveNeighbors;
        this.death = death;
        this.birth = birth;
    }
}
