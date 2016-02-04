// create a regular expression with expression provided.
var regExp = new RegExp(/[a-zA-Z0-9,\-\s]+/);

// tests
console.log("'javascript'" + " = " + regExp.test('javascript')); // true
console.log("' '	" + " = " + regExp.test(' ')); // true
console.log("'javascript:'" + " = " + regExp.test('javascript:')); //true
console.log("'javascript:alert(“hi!!”)'" + " = " + regExp.test("javascript:alert('hi!!')")); //true


