export class Tag {
    name;
    color;

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    get json() {
        return {
            name: this.name,
            color: this.color
        }
    }
}