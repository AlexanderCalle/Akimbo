const category = (cat) => cat.toLowerCase();
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const slugify = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

export { category, capitalize, slugify };

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