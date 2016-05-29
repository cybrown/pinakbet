import Pinakbet from '../../src/index.ts';
describe('Pinakbet', () => {
    it('Pinakbet should be a object', () => {
        expect(Pinakbet).to.be.a.object;
    });
    it('Should work with TypeScript (TS)', () => {
        class Student {
            constructor(firstName, middleInitial, lastName) {
                this.firstName = firstName;
                this.middleInitial = middleInitial;
                this.lastName = lastName;
                this.fullName = firstName + " " + middleInitial + " " + lastName;
            }
        }
        const user = new Student("Jon", "Doe", "User");
        expect(Pinakbet.greeter(user)).to.eql('Hello, Jon User');
    });
    //  greeter
});
//# sourceMappingURL=pinakbet.js.map