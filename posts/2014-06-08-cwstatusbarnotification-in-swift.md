---
title: CWStatusBarNotification in Swift
excerpt: I just got done porting my library, [CWStatusBarNotification](https://github.com/cezarywojcik/CWStatusBarNotification/) to a [new Swift version](https://github.com/cezarywojcik/CWStatusBarNotification/tree/swift). It was a good opportunity to play around with closures, optionals, and other Swifty features.
layout: generic
---

I just got done porting my library, [CWStatusBarNotification](https://github.com/cezarywojcik/CWStatusBarNotification/) to a [new Swift version](https://github.com/cezarywojcik/CWStatusBarNotification/tree/swift). It was a good opportunity to play around with closures, optionals, and other Swifty features.

I was originally hoping to make the Swift version of the library also work with Objective-C, so I began exploring the realms of Swift to Objective-C bridging after I completed the implementation. [This Swift doc](https://developer.apple.com/library/prerelease/ios/documentation/swift/conceptual/buildingcocoaapps/BuildingCocoaApps.pdf) has a very good explanation of how this is done beginning on page 46.

Once I imported the bridging header to my Objective-C based view controller, to my surprise, Xcode yelled at me that my `CWStatusBarNotification` class didn't exist. You can command-click on the automatically generated bridge file to see what it contains. To my surprise, the bridge file had two helper classes that the project includes, `ScrollLabel` and `CWWindowContainer`, but not my main class. I eventually figured out that this is because my Swift implementation of `CWStatusBarNotification` was not a subclass of `NSObject`. Bridging pure Swift classes won't work. That's disappointing, but it makes sense. Once my class was showing up, I noticed that it was somewhat incomplete. I looked at Apple's documentation to find an explanation, and found one. There are some Swift features that simply won't be bridged to Objective-C.

![Swift features not available in Objective-C bridging](http://i.imgur.com/TkHVI8x.png)

I used some enumerations for a good chunk of my settings. I suppose that the more advanced features of `enum`s in Swift make them not portable, even if you're not using these advanced features. Because I love `enum`s in Swift, I scrapped all of the Objective-C that remained in the project and rewrote the Demo portion using only Swift.

This does make me curious about the future of open-source libraries. Will people be quick to drop Objective-C support? Will most libraries maintain versions in both languages? Will ugly Swift code without shiny new Swift features be favored so that the library can work when bridged? How will CocoaPods adapt? It's an exciting time to be an iOS developer.
