/*!
 * pinakbet v0.0.23
 * (c) 2016 KFlash
 * Released under the MIT License.
 */
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var index = {
    greeter: greeter
};

export default index;