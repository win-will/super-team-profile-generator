const Employee = require('../lib/Employee');

describe('Employee', () => {
  describe('Initialization', () => {
        // Positive test
        it("Should create an Employee object with name, id, and email provided", () => {
        // Arrange
        const name = "Tom Anderson";
        const id = 1001;
        const email = 'tom@matrix.com';

        // Act
        const employee = new Employee(name,id,email);

        // Assert
        expect(employee.name).toEqual(name);
        expect(employee.id).toEqual(id);
        expect(employee.email).toEqual(email);
        });

        // Exception test
        it("Should throw an error if not provided an empty 'name' value", () => {
        // Arrange
        const name = "";
        const id = 1001;
        const email = 'tom@matrix.com';

        const cb = () => new Employee(name,id,email);
        const err = new Error(
            "Expected parameter 'name' to be a non-empty string"
        );

        // Assert
        expect(cb).toThrowError(err);
        });

        // Exception test
        it("Should throw an error if provided a negative 'id' value", () => {
            // Arrange
            const name = "Tom Anderson";
            const id = -1;
            const email = 'tom@matrix.com';

        const cb = () => new Employee(name,id,email);
            const err = new Error(
                "Expected parameter 'id' to be a non-negative number"
            );

            // Assert
            expect(cb).toThrowError(err);
        });

        // Exception test
        it("Should throw an error if not provided a validate 'email' value", () => {
            // Arrange
            const name = "Tom Anderson";
            const id = 1001;
            const email = "Tom";

            const cb = () => new Employee(name,id,email);
            const err = new Error(
                "Expected parameter 'email' not a valid format of an email"
            );

            // Assert
            expect(cb).toThrowError(err);
        });

    });
});
