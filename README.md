![Raddle](https://github.com/wshager/raddle.js/raw/master/logo.svg.png)

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

`define($,function-name,function-description,(arguments),return-type[,body])`


Declare a constant:

`var($,constant-name,constant-description,constant-type[,whatever])`


Assign a local variable:

`let($,variable-name,variable-type,whatever)`


Bind a parameter to a function:

`bind($,param-name,param-description,param-type[,whatever])`


The dollar sign provides a context where stuff can be assigned to, but it's also a function. So you could write:

`$(name,whatever[,type])`


To retrieve the value from the current context, you can call the function with a name:

`$(name)`


But the shorthand also works:

`$name`


Function references can be found in yet another way. Since Raddle uses the function's arity to distinguish between functions that have the same name, you can reference it as:

`name#N`

Where N is the number of parameters bound to the function. This is the preferred way.


Finally, for the last bit of shorthand you can use type constructors directly in place of any of the core functions (i.e. 'define', 'var', 'let' and 'bind') above.

`string($,name[,whatever])`


When a type constructor is called with a context as it's first argument, it will default to an assignment. Admittedly, this looks a bit odd for functions:

`function($,func,(argument-types),return-type,function((arguments-with-types),body[,return-type-again]))`

The actual function value is assigned to 'func' of type function as an anonymous function constructor. Because this makes the return type (and bound parameter types) redundant, the return type for an anonymous function is made optional<sup><a href="#1">1</a></sup>.




<div id="1">
1) Please don't try this at home and do try to encourage XQuery people to revise this:

```xquery
let $func as function(xs:string) as xs:string := function($s as xs:string) as xs:string {
    $s
}
return $func("x")
```
</div>
