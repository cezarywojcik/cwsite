---
title: CMStepsCounter is Awesome
excerpt: Judging by the number of pedometer apps to hit the App Store recently, I figured that implementing the pedometer must be fairly easy. I had no idea, however, how easy it actually is. One of the new APIs built into iOS 7 is [`CMStepCounter`](https://developer.apple.com/library/IOs/documentation/CoreMotion/Reference/CMStepCounter_class/Reference/Reference.html). It's made specifically for... counting steps.
layout: generic
---

Judging by the number of pedometer apps to hit the App Store recently, I figured that implementing the pedometer must be fairly easy. I had no idea, however, how easy it actually is.

One of the new APIs built into iOS 7 is [`CMStepCounter`](https://developer.apple.com/library/IOs/documentation/CoreMotion/Reference/CMStepCounter_class/Reference/Reference.html). It's made specifically for... counting steps.

The biggest limitation of the API is that it tracks steps data for at most 7 days. If you want more data than that, you'll have to figure out your own data storage. Below, I'll show you how to make a really simple app that will count your total steps.

Set up a root view controller for your app. Now, we need some way to display the number of steps. All we need for this is a simple `UILabel`. Make it big, because why not.

![Steps Counting](http://i.imgur.com/s49kw50.png)

Hook up the label with an `IBOutlet` and call it something that makes sense, like `stepsLabel`. Now, we can make two simple methods to take care of the `CMStepsCounter`. We'll need a constant named `STEPS_KEY` defined for use with `NSUserDefaults`.

    // this method updates the label based on the value stored in standardUserDefaults
    - (void)updateStepLabel
    {
        NSInteger numberOfSteps = [[NSUserDefaults standardUserDefaults] integerForKey:STEPS_KEY];
        // doing %li and (long) so that we're safe for 64-bit
        self.stepLabel.text = [NSString stringWithFormat:@"%li", (long)numberOfSteps];
    }

    // this method sets up the steps counter
    - (void)setup
    {
        // the if statement checks whether the device supports step counting (ie whether it has an M7 chip)
        if ([CMStepCounter isStepCountingAvailable]) {
            // the step counter needs a queue, so let's make one
            NSOperationQueue *queue = [NSOperationQueue new];
            // call it something appropriate
            queue.name = @"Step Counter Queue";
            // now to create the actual step counter
            CMStepCounter *stepCounter = [CMStepCounter new];
            // this is where the brunt of the action happens
            [stepCounter startStepCountingUpdatesToQueue:queue updateOn:1 withHandler:^(NSInteger numberOfSteps, NSDate *timestamp, NSError *error) {
                // save the numberOfSteps value to standardUserDefaults, and then update the step label
                [[NSUserDefaults standardUserDefaults] setInteger:numberOfSteps forKey:STEPS_KEY];
                [self updateStepLabel];
            }];
        }
    }

Most of the code is fairly explanatory. The main thing that might be unclear is the <code>updateOn</code> argument. From [Apple's CWStepCounter Class Reference](https://developer.apple.com/library/IOs/documentation/CoreMotion/Reference/CMStepCounter_class/Reference/Reference.html), this corresponds to:
>
> The number of steps to record before executing the handler block. The number of steps must be greater than 0.

I set that value to `1` so that we get every step.

Now, we just need to call the setup function to (surprisingly) set the step counter up, and make sure to load the value from `standardUserDefaults` into the `stepsLabel` when the view is loaded.

The only thing we need to do after this is to pop in [[NSUserDefaults standardUserDefaults] synchronize];` in the App Delegate termination, entering foreground, and entering background methods to make sure that the value stays saved.

That's basically all you need to be counting steps. To access "historical" step data, you can use the [`queryStepCountStartingFrom:to:toQueue:withHandler:`](https://developer.apple.com/library/IOs/documentation/CoreMotion/Reference/CMStepCounter_class/Reference/Reference.html#//apple_ref/occ/instm/CMStepCounter/queryStepCountStartingFrom:to:toQueue:withHandler:) function.

I'm going to look into making some kind of pedometer app myself. It seems easy and fun.
