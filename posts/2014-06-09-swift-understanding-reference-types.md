---
title: Swift - Understanding Reference Types
excerpt:  There are three different kinds of references in Swift that are based on the ARC (Automatic Reference Counting) model that we have come to know in Objective-C: `strong`, `weak`, and `unowned`. The difference between these as well as the proper implementation can be somewhat confusing, so I'm writing up a description of each for my own and others' benefit.
layout: generic
---

There are three different kinds of references in Swift that are based on the ARC (Automatic Reference Counting) model that we have come to know in Objective-C: `strong`, `weak`, and `unowned`. The difference between these as well as the proper implementation can be somewhat confusing, so I'm writing up a description of each for my own and others' benefit.

## Strong references

Strong references are the default reference type when a property is declared in a class. As long as a strong reference to an object exists, the object will not be deallocated.

```swift
class Test {
    var strongReference : Int // an example strong reference
}
```

Now, for some history. Before ARC, Objective-C required manual reference counting. For those not lucky enough to have experienced this, here's an example:

```objc
// create (and retain) a new view controller
UIViewController *viewController = [[UIViewController alloc] init];
// release the view controller
[viewController release];
```

Every object had a *retain* count. This represents the number of owners that the object has. When the object is first allocated, the retain count is increased by 1. You could also use the `retain` method when referencing the object elsewhere to further increase the retain count. When `release` is called, this count is decreased by 1. The idea is that when this count reaches 0, the object is deallocated. In the example above, we can clearly see that `viewController` gets deallocated after the `release` call. Automatic Reference Counting was an awesome change to Objective-C because it handled all of this behind the scenes. Swift uses the same idea.

A strong reference is one that increases the retain count of an object. This is where the term retain cycle comes from. Here's a quick example of a retain cycle in Swift:

```swift
class Parent {
    var child1 : Child?
    var child2 : Child?
}

class Child {
    var sibling : Child?
}

var parent : Parent? = Parent()

parent!.child1 = Child() // child1 retain count = 1
parent!.child2 = Child() // child2 retain count = 1
parent!.child2!.sibling = parent!.child1 // child1 retain count = 2
parent!.child1!.sibling = parent!.child2 // child2 retain count = 2

parent = nil // child1, child2 retain count = 1
```

When the parent dies, both of its children are still alive. We don't want that! The children should die too! When a strong reference is used to reference an object, as mentioned before, its retain count increases. In the code above, the `child1` and `child2` objects still exist in memory, but we have no way to access them. However, they are not deallocated because their retain count is not 0. Another way to see it is that they are not deallocated because they own one another. Either way, this causes a memory leak, and it's bad.

## Weak references

We an easily solve the problem of the retain cycle using weak references. A weak reference is one that does **NOT** increase the retain count of the object. In Swift, weak references **MUST** be optional types, and they **MUST** be mutable (cannot use `let`). This makes sense because weak references cannot guarantee that the object is not `nil`.

Here's how we can solve the problem above using weak references:

```swift
class Parent {
    var child1 : Child?
    var child2 : Child?
}

class Child {
    weak var sibling : Child?
}

var parent : Parent? = Parent()

parent!.child1 = Child() // child1 retain count = 1
parent!.child2 = Child() // child2 retain count = 1
parent!.child2!.sibling = parent!.child1 // child1 retain count = 1
parent!.child1!.sibling = parent!.child2 // child2 retain count = 1

parent = nil // child1, child2 retain count = 0
```

We simply make the `sibling` reference a weak one. This causes the retain count not to be increased. The problem of the retain cycle is solved!

However, suppose we want to reference the parent from the child:

```swift
class Child {
    weak var parent : Parent?
    weak var sibling : Child?
}
```

That should work, right? Technically, yes. However, since weak references are optional, this means that it is possible for the parent to be `nil`. What if we want to ensure that all children have parents? We can't do that with a weak reference.

## Unowned references

Enter the `unowned` reference. As opposed to weak references, unowned references **CANNOT** be of optional type. An unowned reference is one that is required to exist in order for an object to exist. Here's an example:

```swift
class Parent {
    var child : Child?
}

class Child {
    unowned let parent : Parent

    init(parent: Parent) {
        self.parent = parent
    }
}

var parent : Parent? = Parent()
parent!.child = Child(parent: parent!)

parent = nil // kill both parent and child
```

This code "guarantees" that a child always has a parent that is not `nil`. In this case, if the unowned `parent` reference is deallocated, the entire instance of the `Child` object is also deallocated. However, we would have the same behavior if we had just made `parent` a weak variable. What's the difference?

Let's consider an alternate example.

```swift
class Parent {}

class Child {
    unowned let parent : Parent

    init(parent: Parent) {
        self.parent = parent
    }

    func test() {
        println("Still Alive")
    }
}

var parent : Parent? = Parent()
var child = Child(parent: parent!)

parent = nil

child.test()
```

After running this code, we'll see an output in the console that says "Still Alive". Since the Parent did not contain a strong reference to the child, the child object's retain count was never decreased. This means that the child is still alive. However, if we try to access `child.parent`, Swift will throw a runtime error. If we had used a weak reference instead, `child.parent` would simply be `nil`. The point of the unowned reference is to fail consistently if it is attempted to be accessed after it has been deallocated. The result, when used properly, is "safer" code.

If you think that I messed something up or think I should add something, let me know!
