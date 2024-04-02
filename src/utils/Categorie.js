export class Category {
    name;
    description;
    image;

    constructor(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    get json() {
        return {
            name: this.name,
            description: this.description,
            image: this.image
        }
    }
}