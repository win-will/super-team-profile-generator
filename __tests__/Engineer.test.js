const Engineer = require('../lib/Engineer');

describe('Engineer', () => {
  describe('Initialization', () => {
        // Positive test
        it("Should create an Engineer object with name, id, email, and github username provided", () => {
            // Arrange
            const name = "Tom Anderson";
            const id = 1001;
            const email = 'tom@matrix.com';
            const github = "neo"

            // Act
            const employee = new Engineer(name,id,email,github);

            // Assert
            expect(employee.name).toEqual(name);
            expect(employee.id).toEqual(id);
            expect(employee.email).toEqual(email);
            expect(employee.github).toEqual(github);

        });

        // Exception test
        it("Should throw an error if provided an empty 'github' value", () => {
            // Arrange
            const name = "Tom Anderson";
            const id = 1001;
            const email = 'tom@matrix.com';
            const github = ""

            const cb = () => new Engineer(name,id,email,github);
            const err = new Error(
                "Expected parameter 'github' to be a non-empty string"
            );

            // Assert
            expect(cb).toThrowError(err);
        });
    });
});