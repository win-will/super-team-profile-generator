const Employee = require('./Employee');

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);

    if (typeof school !== "string" || !school.trim().length) {
        throw new Error("Expected parameter 'school' to be a non-empty string");
    }

    this.school = school;
   
  }
  getSchool(){
    // console.log(`School: ${this.school}`);
    return this.school;
  }
  getRole(){
    return `Intern`;
  }
}

module.exports = Intern;