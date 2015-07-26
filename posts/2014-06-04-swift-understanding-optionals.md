---
title: Swift - Understanding Optionals
excerpt: Largely because I had some trouble understanding the concept of **optional types** in Swift, I wanted to make a writeup to gather my ideas and make a reference for my future self that might not be in the same enlightened state of optional type understanding that possesses me now.
layout: generic
---


Largely because I had some trouble understanding the concept of **optional types** in Swift, I wanted to make a writeup to gather my ideas and make a reference for my future self that might not be in the same enlightened state of optional type understanding that possesses me now.

In Swift, all *normal* variables and constants can't ever by set to `nil`. In order for something to be able to return `nil`, it has to be an *optional type*. Here's an example.

```swift
var optionalInt : Int? = 500
optionalInt = nil
```

This is all well and good. However, if we do this:

```swift
var notOptionalInt : Int = 500
notOptionalInt = nil // ERROR!!!
```

## Unwrapping

When a type is made *optional*, the object is essentially *wrapped* in another entity of some sort that can either give you the object itself or `nil`. The process of retrieving the object is known as **unwrapping**. Here's an example (using the `optionalInt` we declared above).

```swift
let someConstant = 500 + optionalInt! // 500 + 500
```

This almost reminds me of derefrencing pointers, though it's a good bit different. You have to use the exclamation mark every time you want to use the value in some kind of expression. The one exception (that I know of) is that you don't have to do so with `println()`.

```swift
println("optional int: \(optionalInt)")
```

If `optionalInt` is a number, the number will be printed. If `optionalInt` is `nil`, then the word `nil` will be printed. This also works with just `pritnln(optionalInt)`.

There is one important caveat of using this syntax that I will illustrate with an example.

```swift
var optionalInt : Int? = nil
let sum = optionalInt! // RUNTIME ERROR!!!
```
If the value of the object *is*  `nil`, then unwrapping it will cause a runtime error.

There is an alternative way to declare an optional time such that it automatically unwraps when used. Here's an example.

```swift
var optionalInt : Int! = 500
let sum = optionalInt // sum now equals 500
```

We replace the `?` in the type declaration to a `!` instead. This is more convenient, and it also solves the problem we were having with unwrapping an object that is `nil`.

```swift
var optionalInt : Int! = nil
let sum = optionalInt // no error!
```

In the example above, the `sum` variable is automatically set to optional type `Int!` (you can check what type a variable is automatically cast to by option-clicking it).

There's also a third way to unwrap optionals using a `?`. We can use this to test whether or not the unwrapping was successful. Here's an example:

```swift
var optionalInt : Int? = nil
if let sum = optionalInt? {
    println("optional int is not nil, it is \(sum)")
} else {
    println("optional int is nil")
}
```

## Initialization

The main area where I've seen optional types have a noticeable impact is in the `init()` functions. Since variables of non optional type can't be `nil`, Swift enforces the fact that they ***must*** be initialized in the `init()` method. In fact, you can't even call `super.init()` until all of your non-optional properties are initialized.

```swift
class SomeClass {
    var someProperty : Int

    init() {
        self.someProperty = 1 // MUST be initialized
    }
}
```
If a property is not initialized, as we remember from Objective-C, then it is `nil`. It makes sense, then, that only optional types retain the right not to be initialized. As mentioned above, we cannot call `super.init()` if everything hasn't been initialized yet.

```swift
class SomeOtherClass : SomeClass {
    var someOtherProperty : Int

    init() {
        super.init() // ERROR!!!
        self.someOtherProperty = 1
    }
}
```

Apple's default `swift` code for some classes still has a comment that is now misleading. Here is the `init` method for a subclass of `UIViewController`:

```swift
init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: NSBundle?) {
    super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
    // Custom initialization
}
```

You actually have to do custom initialization *above* the `super.init()` function.

Let me know if I messed something up or have any questions.
