# Raddle

A minimalist functional language

See https://github.com/wshager/raddled for definition files.


## What is it?

Raddle is a functional language for manipulating structured documents.

This library provides only a parser and compiler. It utilizes [L3N](https://github.com/wshager/l3n), a tiny format for encoding the language as a flat stream, and [Frink](https://github.com/wshager/frink), the core functionality using a *reactive* approach.

Raddle is inspired by RQL and XQuery.

## Getting started

Run `npm install` to fetch all the dependencies. We need all of them to compile a string of code:

```
import { parseString, run } from 'raddle';
import { fromStream } from 'l3n';
import * as n from 'frink';

parseString("1 + 2").pipe(toVNodeStream,$o => run($o,{
	modules:{
		n:n
	}
}));
```

The parser emits an L3N stream, a flat encoding of the program. However, the compiler expects a `VNode` stream, which wraps it into a more convenient interface. See [L3N](https://github.com/wshager/l3n) for more information.

## Definition Anatomy

The dollar sign provides a context where stuff can be assigned to, and it can be called as a function. So you could write:

`$(name[,documentation][,type],body)`

Character strings don't have to be written in quotes always. Only in cases where ambiguity with reserved characters would arise, a string should be notated between a pair of (single or double) quotes (see [Reserved Characters](#reserved-characters)).


To retrieve the value from the variable, you can call the dollar function with its name:

`$(name)`


However, you may leave off the parentheses for a shorthand notation:

`$name`


### Lambdas

Functions can be defined in the same way as variables are assigned.
Anonymous functions (also known as lambdas) are written within a block of curly brackets. Each parameter of the lambda is referenced numerically, in the order that the function will receive it when it's called, for instance:

`{add($1,$2)}`


Whenever a new lambda function is created, all previous numbered parameters go out of scope. This way inline functions can also be created.
So when a parameter needs to be adressed in a nested lambda, its value should be assigned to a named variable first, since named variables are scoped to the entire block of curly brackets they're in. Example:


`{$(x,$1),$(y,$2),add($x,$y)}`


### Top-level functions

#### $* declare a module

A module must be explicitly prefixed:

`$*(my-module)`

#### $< import a module

`$*(other-module,"path")`

#### $> export a constant

`$>(my-module:compute,body)`

If you don't want to expose the constant, just leave off the `>` sign.

### Types

Types can be provided as function calls:

* `string()`
* `number()` (Equivalent to `double()`)
* `integer()`
* `array()`
* `array(T)` (T is the type of the items in the array.)
* `map()`
* `map(K,V)` (K is the type of the key and V is the type of the value.)
* `function()` (A function with an unknown number of arguments. This is the default constraint for any lambda.)
* `function(S,R)` (S is a sequence of parameter types, and R is the type of the value the function should return.)
* `element(Q)` (Q is the qualified name of the XML element)
* `attribute(Q)` (Q is the qualified name of the XML attribute)


### Partial application

Any function can be partially applied by using a question mark as a placeholder for an unknown parameter:

`add(?,4)`

The above function call returns a partially applied function that can be called with a single argument.
