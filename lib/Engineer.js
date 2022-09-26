const Employee = require('./Employee');

//Engineer class
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);

    if (typeof github !== "string" || !github.trim().length) {
        throw new Error("Expected parameter 'github' to be a non-empty string");
    }

    this.github = github;
  }
  getGithub(){
    // console.log(`GitHub: ${this.github}`);
    return this.github;
  }
  getRole(){
    return `Engineer`;
  }
}

module.exports = Engineer;