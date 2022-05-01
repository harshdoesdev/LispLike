# LispLike
A Tiny Lisp Like Language That Transpiles To JavaScript

**FizzBuzz Example Program**
```lisp
(                                ; All of the program should be enclosed within a single parenthesis or the "Global block"
    (let i 0)                    ; define a variable "i"
    (while (<= i 100)            ; loop while i is less than or equal to 100
        (do
            (let out "")         ; define a local variable "out"
            (if (=== (% i 3) 0)  ; if i % 3 is equal to 0
                (do
                    (+= out "Fizz") ; add Fizz to the string "out"
                )
            )
            (if (=== (% i 5) 0)  ; if i % 5 is equal to 0
                (do
                    (+= out "Buzz") ; add Buzz to the string "out"
                )
            )
            (if (!== out "")
                (do              ; if block
                    (print out)  ; print fizz, buzz, or fizzbuzz
                )
                (                ; else block
                    (print i)    ; else print the number itself
                )
            )
            (+= i 1)             ; increment the value of variable i by 1
        )
    )
)
```

**Transpiled Javascript Code**
Proper indentation is maintained, just the comments have been removed
```javascript
let i = 0;

while(i <= 100) {
  let out = "";

  if(i % 3 === 0) {
    out = out + "Fizz"
  }
  if(i % 5 === 0) {
    out = out + "Buzz"
  }
  if(out !== "") {
    console.log(out)
  } else {
    console.log(i)
  }
  i = i + 1
}
```

**USAGE**
```javascript
import lispLike from './path/to/lispLike/transipler.js';

const code = '((print "hello world!"))';

const jsCode = lispLike(code); // OUTPUT: console.log("hello world")
```

**Data Types**
* String
* Number
* Array
* Null
* Functions

**Looping**
* For-each loop
* While loop

**Conditionals**
* If statement
* If-else statement

**Todo**
* Improve this toy transpiler
* Add error reporting
* ~~Add loops~~ ADDED LOOPS
* ~~Add conditionals~~ ADDED CONDITIONALS

**Examples**

**OOP Example**

```lisp
(
    (defun Person (name age) (do
        (= this.name name)
        (= this.age age)
        (let that this)

        (= this.greet 
            (defun (name) (do
                (print 
                    (+ "Hello " (name.toUpperCase) ", I am " that.name "!"))))))

        (if (< this.age 18) 
            (do
                (print "You are under 18.")
            )
            (
                (print "You are above 18.")
            )
        )

        (= this.count (defun (n) (do
            (let i 1)
            (while (<= i n) (do
                (print i)
                (+= i 1)
            ))
        )))

        (print "Object Initialized!")
    )

    (let john (new Person ("John Doe" 22)))

    (john.greet "World")

    (john.count 10)
)
```
**JS output**
```javascript
function Person (name,age) {
    this.name = name
    this.age = age
    let that = this

    this.greet = function(name) {
        console.log("Hello " + name.toUpperCase() + ", I am " + that.name + "!")
    }

  if(this.age < 18) {
    console.log("You are under 18.")
  } else {
    console.log("You are above 18.")
  }
  this.count = function(n) {
      let i = 1

      while(i <= n) {
        console.log(i)
        i += 1
      }
  }

  console.log("Object Initialized!")
}

let john = new Person("John Doe",22)

john.greet("World")
john.count(10)
```
