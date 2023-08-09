# JSR

jsr stands for "JavaScript Reverse". It is a programming language that is partially identical to JavaScript but in the basic level it has huge difference with Jvascript, but with the syntax reversed. For example, the following code in JavaScript:

```js
var x = 5;
var y = 6;
var z = x + y;
console.log(z);
```

would be written in jsr as:

```jsr
jro(z);
velt z = y + x;
velt y = 6;
velt x = 5;
#include <std>
```

Speciality of this language is it runs from bottom to top. It is written in JavaScript and it is interpreted in JavaScript. It is a very simple programming language but hard to code. It is not meant to be used for anything serious. It is just a fun project.

## How to write jsr code

### Variables and constants

Variables are declared using the `velt` keyword. For example:

```jsr
velt z = x + y;
velt x = 5; // variable
velc y = 6; // constant
#include <std>
```

### input, output, comments and includes

Input is taken using the `jrin` keyword. jro is done using the `jro` keyword. `'${COMMENT}'` is used for block comments. `//` is used for single line comments. `#include <std>` is used to include the standard library. Without standard library included, the code will not run.

For example:

```jsr
'this is a block comment'
jro(x =+ "your name is "); // your name is <name>
velt x = jrin("what is your name?");
#include <std>
```

## Operators

It has all the operators that JavaScript has. I'm not going to list them all here. You can find them [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators). But here I'm going to list some of the operators that are not in JavaScript. They are:

| Title                      | Operator | Description                                                                               | Example          | Result          |
| -------------------------- | -------- | ----------------------------------------------------------------------------------------- | ---------------- | --------------- |
| Addition before assignment | `=+`     | Adds the value of the right operand to a variable and assigns the result to the variable. | `x =+ "abc"`     | `x = "abc" + x` |
| Subtraction before         | `=-`     | Subtracts the value of the right operand from a variable and assigns the result to it.    | `x =- 5`         | `x = 5 - x`     |
| Multiplication before      | `=*`     | Multiplies the value of the right operand to a variable and assigns the result to it.     | `x =* 5`         | `x = 5 * x`     |
| Division before            | `=/`     | Divides the value of the right operand from a variable and assigns the result to it.      | `x =/ 5`         | `x = 5 / x`     |
| Modulus before             | `=%`     | Divides the value of the right operand from a variable and assigns the remainder to it.   | `x =% 5`         | `x = 5 % x`     |
| Factorial                  | `!`      | Returns the factorial of a number.                                                        | `5!`             | 120             |
| Absloute operator          | `\|\|`   | Returns the absolute value of a number.                                                   | `\|-5\|`         | 5               |
| XOR operator               | `^`      | Returns the XOR of two situation                                                          | `0 ^ 1`          | true            |
| XNOR operator              | `!^`     | Returns the NOR of two situation                                                          | `0 !^ 1`         | false           |
| NAND operator              | `!&`     | Returns the NAND of two situation                                                         | `true !& false`  | `true`          |
| NOR operator               | `!\|`    | Returns the NOR of two situation                                                          | `true !\| false` | `false`         |

## Biltin libraries

### standard library

The standard library is a collection of functions that are used in jsr. It is included using the `#include <std>` statement. Without it, the code will not run. It has the following functions:

- `jro(...arg)` - takes one or more arguments and prints them to the console
- `jrin(qustion)` - takes a question as an string and returns the answer
- `clear()` - clears the console
- `exit()` - exits the program
- `sleep(ms)` - sleeps the program for the given amount of milliseconds
- `getch()` - waits for a key to be pressed and closes the program
- `str(...arg)` - converts the arguments to string and returns it
  and so on...
- `num(...arg)` - converts the arguments to number and returns it

### other libraries

- `#include <math>` - includes the math library. It has all the math functions that are in JavaScript. Moreover it has more than 20 extra functions like `sec` , `cosec`, `cot`, `logx`, `mean`, `rootx` etc.
- `#include <arr>` - includes the array library. It has all the array functions that are in JavaScript. Moreover it has some extra features like `mean`, `sum`, `range`, `GCD` etc.
- `#include <obj>` - includes the object library.
- `#include <date>` - includes the date library. It has all the date functions that are in JavaScript.
- `#include <bool>` - includes the boolean library. It has all the boolean functions that are in JavaScript.
- `#include <num>` - includes the number library. It has all the number functions that are in JavaScript. Moreover it has some extra features like `isPrime`,`fact`,`isOdd` etc.
- `#include <func>` - includes the Func library, which can interprate javascript code in jsr
- `#include <str>` - includes the string library
- `#include <reg>` - includes the regex library
- `#include <error>` - includes the error library
- `#include <file>` - includes the file library
- `#include <net>` - includes the net library
<!-- - `#include <crypto>` - includes the crypto library. max char length is 536870888; -->
