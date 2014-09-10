---
title: Swift - From Beta 1 to 1.0
excerpt: I've had a busy summer, so since the initial release of Swift, I haven't had very much time to keep up with the updates the language has undergone over time. Since the [1.0 release is now finalized](https://developer.apple.com/swift/blog/?id=14) and I also finally have some additional time, I figured I'd spend it adjusting something I had made in beta 1 to see how much has changed.
layout: generic
---

I've had a busy summer, so since the initial release of Swift, I haven't had very much time to keep up with the updates the language has undergone over time. Since the [1.0 release is now finalized](https://developer.apple.com/swift/blog/?id=14) and I also finally have some additional time, I figured I'd spend it adjusting something I had made in beta 1 to see how much has changed.

A project that I made when Swift first came out is [`CWSortTester`](https://github.com/cezarywojcik/CWSortTester) - a simple app that tested and graphed sorting speeds of Swift compared to Objective-C. The tests only include bubble sort, quick sort, and the native sort. I initially intended to add some more sorts, but never really got around to it. Regardless, hopefully it will still be a good display of the changes Swift has gone through since the initial release.

![CWSortTester from Swift Beta 1](https://raw.githubusercontent.com/cezarywojcik/CWSortTester/master/screenshot.png)

## 37 Errors, 1 Warning

![37 errors, 1 warning](http://i.imgur.com/xXjtgUO.png)

After first reopening the project in Xcode, as expected, I saw a bunch of errors on the screen.

![errors](http://i.imgur.com/JtjdJid.png)

## New Array Syntax

The first issue I decided to address is the new `Array` syntax. As Xcode tells me, `Array types are now written with the brackets around the element type`. This means changing this:

    var sortLog : String[] = []

to this:

    var sortLog : [String] = []

It was pretty easy to find and fix the other instances of this change.

This change was introduced in [Xcode 6 beta 3](https://developer.apple.com/swift/blog/?id=3). Normal array declarations are not changed (e.g. `Array<Int>`), but shorthand changed from the more C-like `Int[]` to the arguably clearer `[Int]`.

Another bit of array fun is regarding the `+=` operator. I had the following line of code originally:

    self.sortLog += "\(getSortName()) for \(self.to) random integers:"

Due to possible ambiguity with working with `Any` or `AnyObject` types, the `+=` operator was changed to only concatenate arrays. To append an element, the two options now are using the `.append` function or putting the right hand side in an array:

    self.sortLog += ["\(getSortName()) for \(self.to) random integers:"]

Though this syntax works, I think that I'm going to stick with `.append` because it is more clear.

## Required Initializers

The next thing I decided to address is the message that all of my subclasses of `UIViewController` kept yelling at me. Since beta 1, it looks like a new `required` keyword has been introduced. This keyword forces all subclasses of a class to implement the function that has been appended with the `required` keyword. These functions in the subclass also have to have the `required` keyword so that the effect trickles down to all potential future subclasses. According to posts
in the Apple Developer forums, this issue was first introduced in beta 5.

To solve the issue, I had to add the following code to all of my `UIViewController` subclasses:

    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

In one case, I had already implemented the initializer, but I didn't have the required keyword there, so I only needed to add that.

![required](http://i.imgur.com/wp0bHzU.png)

## Optional Juggling

I also had to remove the implicit unwrapping operator, `!`, from `NSCoder` in the code from the previous section. This value can no longer be `nil`, so its "optionality" was removed. This, apparently, was a common new issue that I found in other parts of my code as well.

![not optional](http://i.imgur.com/s972VMn.png)

The other optional issue that I still had was regarding `@IBOutlet` properties. Previously, the following was valid:

    @IBOutlet var testSortButton : UIBarButtonItem

The `@IBOutlet` modifier would let the compiler know that this is basically a `weak` reference without needing to specify it as such. However, now, Xcode was angry at me and said "'IBOutlet' property has non-optional type 'UIBarButtonItem'." It looks like outlets properties were made optional in beta 4, and that makes plenty of sense, since the outlets can possibly be `nil`.

![optional outlet](http://i.imgur.com/5Tp7fE0.png)

Some other properties were changed to be optionals as well. For instance, the well-known `self.navigationController` is now understandably optional. Also, the following:

    override func tableView(tableView: UITableView!, cellForRowAtIndexPath indexPath: NSIndexPath!) -> UITableViewCell!
	    
is now:

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell
		    
All of the optionals were removed in this case.

## .. to ..<

From the [Official Swift Blog:](https://developer.apple.com/swift/blog/?id=3)

> The half-open range operator has been changed from .. to ..< to make it more clear alongside the ... operator for closed ranges.

Personally, I kind of liked the simplicity of `..` and `...`. The `..<` makes more sense, especially for quick reading of code, but it's sort of a weird looking operator. Anyhow, this issue was pretty easy to fix.

## More Array Stuff

![weird error](http://i.imgur.com/1foNbiF.png)

This is a weird-looking error. Fortunately, a little bit of searching helped me figure out what the issue was. Originally, "immutable" arrays in Swift worked very strangely, because the members of the "immutable" array were still mutable. In the beta 3 update, Apple completely revised the semantics of arrays so that immutable arrays were fully immutable. This means that in order to modify the array that is passed in, we now have to specify that we can modify it using the `inout`
keyword:

    static func quickSort<T : Comparable>(inout arr : [T], left: Int, right: Int)

This is because arrays are implemented as `struct`s in Swift, and `struct`s are passed by value, not by reference as classes are. An interesting side effect (and obvious callback to C) of this is that when the arrays are passed into the function, we have to use an explicit '&':

![explicit '&'](http://i.imgur.com/gs6vgi4.png)

Adding the `inout` modifier, however, added some new errors to my code:

![new errors](http://i.imgur.com/tjqJNgX.png)

The first thing I noticed was that I wasn't using the explicit '&' when calling the functions. I hoped that changing `swiftSorter.bubbleSort($0)` to `swiftSorter.bubbleSort(&$0)` would do the trick, but I was mistaken. All this did was change the error message `'[Int]' is not a subtype of 'inout [T]'` to `'[Int]' is not a subtype of '@lvalue [T]'`. 

Next, I tried getting rid of he `$0` shorthand and being more explicit:

    self.testSorts(swiftSort: {(arr: [Int]) -> () in swiftSorter.bubbleSort(&arr)},
         objcSort: {objcSorter.bubbleSort($0)})

As a result, I got a shiny new error message: `'[Int]' is not convertible to '@lvalue inout $T5'`. What I was missing was the `var` keyword. Parameters are immutable by default (as if declared by `let`), so in order to be able to pass the variable in by reference in order to modify it, it has to be modifiable to begin with. So what I needed was:

    self.testSorts(swiftSort: {(var arr: [Int]) -> () in swiftSorter.bubbleSort(&arr)},
        objcSort: {objcSorter.bubbleSort($0)})
	            
## Access Control

Now that I am at a point at which my app once again compiles, I can take a look at access control. Surprisingly enough, when Swift first launched, it had no access control whatsoever. Fortunately, in [beta 4](https://developer.apple.com/swift/blog/?id=5), 3 access control keywords were added: `public`, `private`, and `internal`. 

The `public` and `private` keywords are well-known and understood, but the `internal` keyword is new. This seems to be Apple's take on the usual `protected` concept. A property that is `internal` is available only to the module that includes its definition. This is the default access level for all variables.

After looking at my code, I didn't see any particular need to change any variable to something other than the default `internal`, but access control will definitely be useful for other things in the future, and I'm glad that it is finally there.

## Wrap-up

In beta 1, both "Quick Sort" and "Native Sort" performed the same exact way, that is, Objective-C was always significantly faster. That still remains the case here for "Quick Sort," but when using "Native Sort," Swift actually edges Objective-C out most of the time. This is consistent with [Jesse Squires' recent popular writeup](http://www.jessesquires.com/apples-to-apples-part-two/).

There seem to still be some auto-layout issues that weren't there back in beta 1 days, but I mainly wanted to focus on the Swift for now. You can find a diff on the full changes [here on my GitHub page](https://github.com/cezarywojcik/CWSortTester/commit/ccf37e4b287058fa085730704af137d18e1ad027).

The [Official Swift Blog](https://developer.apple.com/swift/blog/) is a good source of documentation of past and future changes - I doubt that I ran into all of them here, but I think that I at least hit most of the big ones. I can't wait to see what changes Swift will undergo in the future.
