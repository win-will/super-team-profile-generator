const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class Employee {
    // Just like constructor functions, classes can accept arguments
    constructor(name, id, email) {
        if (typeof name !== "string" || !name.trim().length) {
            throw new Error("Expected parameter 'name' to be a non-empty string");
        }
        
        if (typeof id !== "number" || isNaN(id) || id < 0) {
            throw new Error("Expected parameter 'id' to be a non-negative number");
        }
        
        if(!emailRegex.test(email)) {
            throw new Error("Expected parameter 'email' not a valid format of an email");
        }

        this.name = name;
        this.id = id;
        this.email = email;
    }
  
    getName () {
      console.log(`Name: ${this.name}`);
      return this.name;
    }
    getId () {
        console.log(`Id: ${this.id}`);
        return this.id;
    }
    getEmail () {
        console.log(`Email: ${this.email}`);
        return this.email;
    }
    getRole() {
        return `Employee`;
    }
  }

  module.exports = Employee;