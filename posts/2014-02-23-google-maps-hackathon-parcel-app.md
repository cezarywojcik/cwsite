---
title: Google Maps Hackathon - Parcel App
excerpt: ![Parcel Screenshot](http://i.imgur.com/vfmURS7.png?1) Yesterday, I got to participate in the Google Maps Hackathon held at Oregon State University, and I had a great deal of fun. My team won the prize for Best Overall App by implementing my idea called **Parcel**.
layout: generic
---

![Parcel Screenshot](http://i.imgur.com/vfmURS7.png?1)

Yesterday, I got to participate in the Google Maps Hackathon held at Oregon State University, and I had a great deal of fun. My team won the prize for Best Overall App by implementing my idea called **Parcel**.

The idea behind the Google Maps Hackathon was simply to make an App that uses the new Google Maps SDK on either Android or iOS. The hackathon only allotted around 8 hours (10 am to 6 pm) for the actual implementation, so right away, App ideas were fairly limited assuming that some basic manner of completion is desired.

Largely inspired by [Where's George](http://www.wheresgeorge.com/), my idea is something I like to call **digital geocaching**. The concept begins with a server that has some pair of coordinates stored as the location of the "Parcel." If someone with the **Parcel** App is near the digital "Parcel," then that person can (digitally, of course) pick the parcel up. That person can then drop the "Parcel" off somewhere, where it can be picked up by someone else. The idea is to track the progress of the Parcel's location over time as different people carry it to new places.

Though our basic implementation is extremely rudimentary, and barely has any security checking, my team was able to get a working version of the App working, complete with a back end written in Go on Google's App Engine. I really like the idea, and I plan to (hopefully) continue working on this App to a point at which it can actually safely be used by a large number of people. The plan also includes adding a note each time the "Parcel" is dropped that only shows up for the person that picks the "Parcel" up next.
