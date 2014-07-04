---
title: iOS - CWPopup
excerpt: Recently, I've gotten back into iOS Development. One of the UI elements that I've thought about adding a good few times is a popup view controller, so I went ahead and made it. ![CWPopup](https://raw.github.com/cezarywojcik/CWPopup/master/popup.gif)
layout: generic
---

Recently, I've gotten back into iOS Development. One of the UI elements that I've thought about adding a good few times is a popup view controller, so I went ahead and made it. ![CWPopup](https://raw.github.com/cezarywojcik/CWPopup/master/popup.gif)

To make the popup view controller, I added a category on UIViewController. I added two basic methods to present and dismiss the popup view controller.

Presenting the popup view controller:

    - (void)presentPopupViewController:(UIViewController *)viewControllerToPresent animated:(BOOL)flag completion:(void (^)(void))completion {
        // setup
        self.popupViewController = viewControllerToPresent;
        CGRect frame = viewControllerToPresent.view.frame;
        CGFloat x = ([UIScreen mainScreen].bounds.size.width - viewControllerToPresent.view.frame.size.width)/2;
        CGFloat y =([UIScreen mainScreen].bounds.size.height - viewControllerToPresent.view.frame.size.height)/2;
        CGRect finalFrame = CGRectMake(x, y, frame.size.width, frame.size.height);
        // shadow setup
        viewControllerToPresent.view.layer.shadowOffset = CGSizeMake(0.0f, 0.0f);
        viewControllerToPresent.view.layer.shadowColor = [UIColor blackColor].CGColor;
        viewControllerToPresent.view.layer.shadowRadius = 3.0f;
        viewControllerToPresent.view.layer.shadowOpacity = 0.8f;
        viewControllerToPresent.view.layer.shadowPath = [UIBezierPath bezierPathWithRect:viewControllerToPresent.view.layer.bounds].CGPath;
        // rounded corners
        viewControllerToPresent.view.layer.cornerRadius = 5.0f;
        // black uiview
        UIView *fadeView = [UIView new];
        fadeView.frame = [UIScreen mainScreen].bounds;
        fadeView.backgroundColor = [UIColor blackColor];
        fadeView.alpha = 0.0f;
        [self.view addSubview:fadeView];
        objc_setAssociatedObject(self, &CWFadeViewKey, fadeView, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
        if (flag) { // animate
            CGRect initialFrame = CGRectMake(finalFrame.origin.x, [UIScreen mainScreen].bounds.size.height + 10, finalFrame.size.width, finalFrame.size.height);
            viewControllerToPresent.view.frame = initialFrame;
            [self.view addSubview:viewControllerToPresent.view];
            [UIView animateWithDuration:ANIMATION_TIME delay:0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
                viewControllerToPresent.view.frame = finalFrame;
                fadeView.alpha = FADE_ALPHA;
            } completion:^(BOOL finished) {
                [completion invoke];
            }];
        } else { // don't animate
            viewControllerToPresent.view.frame = finalFrame;
            [self.view addSubview:viewControllerToPresent.view];
            [completion invoke];
        }
    }

Dismissing the popup view controller:

    - (void)dismissPopupViewControllerAnimated:(BOOL)flag completion:(void (^)(void))completion {
        UIView *fadeView = objc_getAssociatedObject(self, &CWFadeViewKey);
        if (flag) { // animate
            CGRect initialFrame = self.popupViewController.view.frame;
            [UIView animateWithDuration:ANIMATION_TIME delay:0 options:UIViewAnimationOptionCurveEaseInOut animations:^{
                self.popupViewController.view.frame = CGRectMake(initialFrame.origin.x, [UIScreen mainScreen].bounds.size.height, initialFrame.size.width, initialFrame.size.height);
                fadeView.alpha = 0.0f;
            } completion:^(BOOL finished) {
                [self.popupViewController.view removeFromSuperview];
                [fadeView removeFromSuperview];
                self.popupViewController = nil;
                [completion invoke];
            }];
        } else { // don't animate
            [self.popupViewController.view removeFromSuperview];
            [fadeView removeFromSuperview];
            self.popupViewController = nil;
            fadeView = nil;

            [completion invoke];
        }
    }

Because there is an option to dismiss without animation, it is also possible to implement custom dismissal animations as well as gesture-based dismissal. You can find the project on my [GitHub page](https://github.com/cezarywojcik/CWPopup).
