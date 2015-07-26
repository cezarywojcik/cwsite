---
title: CWStatusBarNotification v2.0
excerpt: ![CWStatusBarNotification](https://github.com/cezarywojcik/CWStatusBarNotification/raw/master/screenshots/demo.gif) I just updated my [CWStatusBarNotification](https://github.com/cezarywojcik/CWStatusBarNotification) library to version 2.0. The changes are fairly substantial as I refactored the entire library.
layout: generic
---

![CWStatusBarNotification](https://github.com/cezarywojcik/CWStatusBarNotification/raw/master/screenshots/demo.gif)

I just updated my [CWStatusBarNotification](https://github.com/cezarywojcik/CWStatusBarNotification) library to version 2.0. The changes are fairly substantial as I refactored the entire library.

The previous version of the library was a category on `UIViewController`. However, I decided to refactor it to be an object instead. This makes for cleaner code since I don't have to store new properties on `UIViewController` and mess with `objc_setAssociatedObject` and `objc_getAssociatedObject`. It also provides easier access to settings.

The other substantial change involves all of the new animation options. There are now a total of 16 animation possibilities to choose from (4 in animations, 4 out animations). All of these animate the status bar in/out as well by taking a screenshot of the status bar and animating it.

Check out the [README](https://github.com/cezarywojcik/CWStatusBarNotification/blob/master/README.md#cwstatusbarnotification) on the project for more detailed implementation information.
