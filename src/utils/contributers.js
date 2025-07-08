export class Contributer {
  id;
  name;
  description;
  link;

  constructor(id, name, description, link, alias) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.link = link;
  }
}