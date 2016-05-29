"use strict";
var index_ts_1 = require('../../src/index.ts');
describe('Pinakbet', function () {
    it('Pinakbet should be a object', function () {
        expect(index_ts_1["default"]).to.be.a.object;
    });
    it('Should work with TypeScript (TS)', function () {
        var Student = (function () {
            function Student(firstName, middleInitial, lastName) {
                this.firstName = firstName;
                this.middleInitial = middleInitial;
                this.lastName = lastName;
                this.fullName = firstName + " " + middleInitial + " " + lastName;
            }
            return Student;
        }());
        var user = new Student("Jon", "Doe", "User");
        expect(index_ts_1["default"].greeter(user)).to.eql('Hello, Jon User');
    });
});
