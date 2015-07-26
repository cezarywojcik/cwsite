---
title: iOS - CWPopup Updates
excerpt: ![CWPopup](https://raw.github.com/cezarywojcik/CWPopup/master/popup.gif) For the release of iOS 7, I added 3 main features to my CWPopup iOS library.
layout: generic
---

![CWPopup](https://raw.github.com/cezarywojcik/CWPopup/master/popup.gif)

 For the release of iOS 7, I added 3 main features to my CWPopup iOS library.

Firstly, I added support for rotating the device. I hadn't thought of doing this until I accidentally rotated my device when testing the popup. The library now has full support for staying in the middle of the screen and resizing the background as well.

Speaking of the background, another new feature I added just for iOS 7 is a blurred background view. This blur is achieved through taking a screenshot of the interface, and then applying a blur effect on it. The downside of this implementation is that it won't work well if the background is animating. Still, it is a good-looking effect if the background is static. Special thanks to [this StackOverflow reply](http://stackoverflow.com/questions/8528726/does-ios-5-support-blur-coreimage-fiters/8916196#8916196) for the Gaussian blur algorithm.

![Popup Blur](https://raw.github.com/cezarywojcik/CWPopup/master/popupblur.gif)

Finally, I added iOS 7 parallax support for the popup. This means that the popup will move slightly depending on the tilt of the device. Doing this was actually fairly simple:

     // parallax setup if iOS7+
    if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0) {
        UIInterpolatingMotionEffect *interpolationHorizontal = [[UIInterpolatingMotionEffect alloc] initWithKeyPath:@"center.x" type:UIInterpolatingMotionEffectTypeTiltAlongHorizontalAxis];
        interpolationHorizontal.minimumRelativeValue = @-10.0;
        interpolationHorizontal.maximumRelativeValue = @10.0;
        UIInterpolatingMotionEffect *interpolationVertical = [[UIInterpolatingMotionEffect alloc] initWithKeyPath:@"center.y" type:UIInterpolatingMotionEffectTypeTiltAlongVerticalAxis];
        interpolationHorizontal.minimumRelativeValue = @-10.0;
        interpolationHorizontal.maximumRelativeValue = @10.0;
        [self.popupViewController.view addMotionEffect:interpolationHorizontal];
        [self.popupViewController.view addMotionEffect:interpolationVertical];
    }

The new version is `1.1.2` and you can find it on my [GitHub page](https://github.com/cezarywojcik/CWPopup).
