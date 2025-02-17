class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short!");
      return;
    }

    this._name = value;
  }
}

let user1 = new User("John", "johndoe@example.com");
console.log(user1.name);
user1 = new User("abu");

console.log
