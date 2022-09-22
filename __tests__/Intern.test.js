const Intern = require('../lib/Intern');

describe('Intern', () => {
  describe('Initialization', () => {
        // Positive test
        it("Should create an Intern object with name, id, email, and school provided", () => {
            // Arrange
            const name = "Tom Anderson";
            const id = 1001;
            const email = 'tom@matrix.com';
            const school = "University of Phoenix"

            // Act
            const employee = new Intern(name,id,email,school);

            // Assert
            expect(employee.name).toEqual(name);
            expect(employee.id).toEqual(id);
            expect(employee.email).toEqual(email);
            expect(employee.school).toEqual(school);

        });

        // Exception test
        it("Should throw an error if provided an empty 'school' value", () => {
            // Arrange
            const name = "Tom Anderson";
            const id = 1001;
            const email = 'tom@matrix.com';
            const school = ""

            const cb = () => new Intern(name,id,email,school);
            const err = new Error(
                "Expected parameter 'school' to be a non-empty string"
            );

            // Assert
            expect(cb).toThrowError(err);
        });
    });
});