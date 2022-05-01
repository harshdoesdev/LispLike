# LispLike
A Tiny Lisp Like Language Written in Javascript For 2D Games

**Usage**
```javascript
import lispLike from '/path/to/lispLike.js';

const code = `
(
  (let $name "World")
  
  (defun say-hello ($name) (print (+ "Hello " $name "!")))
  
  (say-hello $name)
)
`;

const jsCode = lispLike(code); // transpiles "lisp-like" code to JavaScript code
```

**Javascript Output**
```javascript
let name = "World"
let sayHello = (name) => console.log("Hello "+name+"!")
sayHello(name)
```
