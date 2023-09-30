export class Article {
    title;
    content;
    desc;
    author;
    category;
    tags;
    created_date;
    image;
    image_title;
    image_author;

    constructor(title, content, author, category, tags, image) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.category = category;
        this.tags = tags;
        this.image = image;
        this.created_date = new Date.now()
    }

    get json() {
        return JSON.parse({
            title: this.title,
            conent: this.conent,
            author: this.author,
            category: this.category,
            tags: this.tags,
            created_date: this.created_date,
            image: this.image
        })
    }
}