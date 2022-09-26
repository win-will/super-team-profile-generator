const Employee = require('./Employee');


//Manager class
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);

    if (typeof officeNumber !== "number" || isNaN(officeNumber) || officeNumber < 0) {
        throw new Error("Expected parameter 'officeNumber' to be a non-negative number");
    }
    this.officeNumber = officeNumber;
  }
  getRole(){
    return `Manager`;
  }
}

module.exports = Manager;