# Raddle
Recursive Definition Language for the Web

See https://github.com/wshager/raddled for definition files.


## What is it?

Raddle is a rad new language for manipulating structured documents on the web. It is [fully-featured](#fully-featured), [functional](#functional), [point-less](#point-less), [URL-encodable](#url-encodable), [type-safe](#type-safe) and completely [free](#free) (as in speech).

### Fully-featured

The Raddle core provides a parser, compiler and runtime environment. It utilizes [Frink](https://github.com/wshager/frink), a full set of standards-compliant functions build in modern JavaScript.

### Functional

Raddle has all the good things from functional programming, including respect for [immutability](http://en.wikipedia.org/wiki/Immutable_object), [higher-order functions](http://en.wikipedia.org/wiki/Higher-order_function), [abstraction](http://en.wikipedia.org/wiki/Lambda_calculus), [recursion](http://en.wikipedia.org/wiki/Recursion_%28computer_science%29) and [referential transparency](http://en.wikipedia.org/wiki/Referential_transparency_%28computer_science%29).

### Point-less

You can use variables in Raddle, but most of the time you don't have to.

### URL-encodable

Raddle is inspired by RQL, and has the same notation. If you're already familiar with RQL you can start hacking right away.

### Type-safe

With Raddle's type declarations, types are kept in check.

### Free

Raddle is licensed under the new BSD license.


## Genesis

Raddle was inspired by RQL and XQuery. RQL is a great tool for querying JSON, but with Raddle you can extend that greatness! It is capable of handling more types than arrays of objects, and you can add new functionality, either inline or from external modules.

Furthermore, Raddle encourages implementation in other languages, as its core definitions are clear and concise from the start.
____

## Definition Anatomy


Define a function:

`core:define($,function-name,function-description,return-type,(arguments)[,body])`

---
Declare a constant:

`core:var($,constant-name,constant-description,constant-type[,whatever])`

---
Assign a local variable:

`core:let($,variable-name,variable-type,whatever)`

---
Bind a parameter:

`core:bind($,param-name,param-description,param-type[,whatever])`



