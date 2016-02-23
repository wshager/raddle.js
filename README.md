# Raddle
Recursive Definition Language for the Web

See https://github.com/wshager/raddled.git for definition files.


## What is it?

Raddle is a rad new language for manipulating structured documents on the web. It is [fully-featured](#fully-featured), [functional](#functional), [point-less](#point-less), [URL-encodable](#url-encodable), [type-safe](#type-safe) and completely [free](#free) (as in speech).

### Fully-featured

The Raddle core implements the entire W3C XQUERY 3.1 function specification and then some.

### Functional

Raddle has all the good things from functional programming, including respect for [immutability](http://en.wikipedia.org/wiki/Immutable_object), [higher-order functions](http://en.wikipedia.org/wiki/Higher-order_function), [abstraction](http://en.wikipedia.org/wiki/Lambda_calculus), [recursion](http://en.wikipedia.org/wiki/Recursion_%28computer_science%29) and [referential transparency](http://en.wikipedia.org/wiki/Referential_transparency_%28computer_science%29).

### Point-less

You can't declare variables in Raddle, as you won't need them.

### URL-encodable

Raddle is inspired by RQL, and has the same notation. If you're already familiar with RQL you can start hacking right away.

### Type-safe

With Raddle's type declarations, types are kept in check.

### Free

Raddle is licensed under the AFL or BSD license.


## Genesis

Raddle was inspired by RQL. RQL is a great tool for querying JSON, but with Raddle you can extend that greatness! It is capable of handling more types than arrays of objects, and you can add new functionality, either inline or from external modules.

Furthermore, Raddle encourages implementation in other languages, as its core definitions are clear and concise from the start.

## TODO

* Implement Raddle's parser and transpiler in Javascript, XQuery, Java, PHP, Scala, Ruby, Perl, Python, C++, et cetera.
* Implement Raddle's core functions in Javascript, XQuery, Java, PHP, Scala, Ruby, Perl, Python, C++, et cetera.
* Make Raddle compatible with Dojo's [dstore](https://github.com/sitepen/dstore).
* Use Raddle to manipulate the browser's DOM.
