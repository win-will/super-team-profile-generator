const Manager = require('../lib/Manager');

describe('Manager', () => {
  describe('Initialization', () => {
        // Positive test
        it("Should create an Manager object with name, id, email, and officeNumber provided", () => {
            // Arrange
            const name = "Tom Anderson";
            const id = 1001;
            const email = 'tom@matrix.com';
            const officeNumber = 1000;

            // Act
            const employee = new Manager(name,id,email,officeNumber);

            // Assert
            expect(employee.name).toEqual(name);
            expect(employee.id).toEqual(id);
            expect(employee.email).toEqual(email);
            expect(employee.officeNumber).toEqual(officeNumber);

        });

        // Exception test
        it("Should throw an error if provided an empty 'officeNumber' value", () => {
            // Arrange
            const name = "Tom Anderson";
            const id = 1001;
            const email = 'tom@matrix.com';
            const officeNumber = -1;

            const cb = () => new Manager(name,id,email,officeNumber);
            const err = new Error(
                "Expected parameter 'officeNumber' to be a non-negative number"
            );

            // Assert
            expect(cb).toThrowError(err);
        });
    });
});