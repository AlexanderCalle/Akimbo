export class User {
    firstname;
    lastname;
    email;
    bio;
    short_desc;
    image;

    constructor(firstname, lastname, email, bio, short_desc, image) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.bio = bio;
        this.short_desc = short_desc;
        this.image = image;
    }

    get json() {
        return {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            bio: this.bio,
            short_desc: this.short_desc,
            image: this.image
        }
    }
}