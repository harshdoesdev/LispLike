# LispLike
A Tiny Lisp Like Language That Transpiles To JavaScript

**Usage**
```javascript
import lispLike from '/path/to/lispLike/transpiler.js';

const code = `
(
  (let $name "World")
  
  (defun say-hello ($name) (print (+ "Hello " $name "!")))
  
  (say-hello $name)
)
`;

const jsCode = lispLike(code); // transpiles "lisp-like" code to JavaScript code
```

**Javascript Code**
```javascript
let name = "World"
let sayHello = (name) => console.log("Hello "+name+"!")
sayHello(name)
```
**Example 2:**
```lisp
(
    (defun add-two-number ($n1 $n2)
        (+
            "Adds two numbers: "
            ((+ $n1 $n2))
        )
    )
    (print (add-two-number 10 20))
)
```
Output:
```javascript
let addTwoNumber = (n1,n2) => "Adds two numbers: "+(n1+n2)
console.log(addTwoNumber(10,20))
```

**Todo**
* Improve this toy transipler
* Add error reporting
* Add loops
* Add conditionals
