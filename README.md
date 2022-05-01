# LispLike
A Tiny Lisp Like Language That Transpiles To JavaScript

**FizzBuzz Example Program**
```lisp
(                                 ; All of the program should be enclosed within a single parenthesis or the "Global block"
    (let $i 0)                    ; define a variable "i"
    (while (<= $i 100)            ; loop while i is less than or equal to 100
        (do
            (let $out "")         ; define a local variable "out"
            (if (=== (% $i 3) 0)  ; if i % 3 is equal to 0
                (do
                    (= out (+ $out "Fizz")) ; add Fizz to the string "out"
                )
            )
            (if (=== (% $i 5) 0)  ; if i % 5 is equal to 0
                (do
                    (= out (+ $out "Buzz")) ; add Buzz to the string "out"
                )
            )
            (if (!== $out "")
                (do               ; if block
                    (print $out)  ; print fizz, buzz, or fizzbuzz
                )
                (                 ; else block
                    (print $i)    ; else print the number itself
                )
            )
            (= $i (+ $i 1))       ; increment the value of variable i by 1
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
* List (Array)
* Null

**Looping**
* For-each loop
* While loop

**Conditionals**
* If statement
* If-else statement

**Todo**
* Improve this toy transipler
* Add error reporting
* ~~Add loops~~ ADDED LOOPS
* ~~Add conditionals~~ ADDED CONDITIONALS
