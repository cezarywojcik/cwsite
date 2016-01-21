---
title: No Sleep, No Problem - A Word Game In 30 Days
excerpt: Almost every developer has looked at a piece of software at some point and thought, "I could do better, and it wouldn't even be that hard." I tend to think that several times a day. It's nagging, annoying feeling, because no task is as simple as it sounds. Developers, especially, should know better - but we don't.
layout: generic
---

Almost every developer has looked at a piece of software at some point and thought, "I could do better, and it wouldn't even be that hard." I tend to think that several times a day. It's nagging, annoying feeling, because no task is as simple as it sounds. Developers, especially, should know better - but we don't.

I was looking through the AppStore a bit ago just to see what was out there. I downloaded several of the "top" applications, and as I was messing around with them, I couldn't help but shake that familiar feeling. Having recently started a full time iOS position, my confidence that I could do better was, well, overwhelming. 

I decided that I would prove myself right. I made a plan, found some help, and gave myself around 30 days for the project. Now, it's finally time to release what I've been working on - [WordIQ](http://itunes.apple.com/app/id1059196571)!

Though it took a week or two over my initial 30 day plan, I learned a lot over the process, and I'm pretty happy with the app that I ended up with. Surely, if I can make [a fully functional app in a hackathon + change](http://cezarywojcik.com/2014/05/15/corbus-coming-soon), I can find the time to make a fleshed out game of some sort in 30 days, right?

## Failed Projects

Whenever starting a new project, I can't help but think back on other projects that I started and never finished. A few years back, for instance, I felt somewhat inspired by a pretty well-known game called [Letterpress](https://itunes.apple.com/us/app/letterpress-word-game/id526619424?mt=8). The concept was so simple, yet so beautifully executed. The game was the first to really make use of Apple's own matchmaking system in GameCenter. In fact, it was so popular [that it brought the entire service down](http://kotaku.com/5955318/apples-game-center-seems-to-be-malfunctioning-today-blame-letterpress), as it hadn't experienced such high levels of traffic before.

I started playing around with GameCenter myself, and got a lot of the framework implemented. I set up a data structure that passed information about game tiles, set up listeners to react to notifications about your opponent taking a turn, etc. In the end, though, I realized that I didn't really actually have a concept of a game. I kind of figured that I would come up with one as I was setting up the infrastructure, but I hadn't.

![An unfinished prototype](http://i.imgur.com/5vvJsle.gif)

Some time later, I had another ambitious idea to create some kind of strategy game. This time, I started with the actual game.

![Another unfinished prototype](http://imgur.com/olaTjI7.gif)

Again, I hit a wall, and school and other priorities took over.

## Design Beginnings

Once I figured out what kind of gameplay I wanted, instead of running straight into the implementation, I started out by actually mocking up some designs (since I had given myself an entire 30 days). Like any engineer pretending to be a designer, I googled around a bit and decided to start with a color scheme. I went to [paletton.com](http://paletton.com/) and played with the sliders until I had some kind of color scheme.

![My first color scheme](http://i.imgur.com/Fn5UWnV.png)

Once I had my color scheme, I decided to draw some kind of design.

![My first design](http://imgur.com/8SLkL46.png)

As you can see, my initial name for the game was **Wordr** - even the words in this puzzle mock are "THE FUTURE IS WORDR". Now that I had this sample puzzle and design, I began work on what the gameplay would feel like. I wanted to make sure that interacting with the tiles felt *real* and *delightful*. After playing with many different kinds of animations, I grew to really like a slight 3D tilt to the animation. The tiles changes colors and tilt down on selection, shake left and right if the selection doesn't form a word, and fall to the bottom if they do.

![Initial gameplay](http://i.imgur.com/vuc9LEr.gif)

## Generation

Once I felt like I had the core mechanics in place, it was time to get to the fun part - finding an algorithm to generate random puzzles. I got out a tablet and began sketching some ideas of how the algorithm would work - sometimes some skeleton code just isn't quite enough.

I ended up sketching out around 4 pages on how the algorithm could work, asked for feedback, and finally implemented it. The process only took around 2 days, though those days didn't involve much sleep. Figuring out the generation was addicting, exhausting, and very satisfying.

![Designing the generation algorithm](http://i.imgur.com/g2GadxG.png)

## Getting Some Help

Once I could randomly generate a puzzle, it didn't take long to generate a game's worth of them. I spent some time testing the generated puzzles to make sure that they were actually solvable, and then set up a script that generates all of the puzzles needed for the game. It was around this point that I started getting that feeling of getting close to hitting a wall. I had a working prototype, but it was further from being a game than I could realize.

Not wanting to end up with another unfinished project, I asked around for ideas, and eventually got some help from a designer. It's at this point that we changed the name of the app from **Wordr** to **WordIQ** and decided on a new, far better-looking aesthetic for the game.

![An early design](http://imgur.com/wYSY20Y.png)

We iterated on these designs and got feedback until we had something that we were happy with.

## Getting To It

Finally, with a clearer idea of the design in mind, it was time to implement the actual game. This is where things got addicting. I spent many nights working on features and not realizing that it was 4, 5, or sometimes even 6am when I had finished working on a particular feature.

Every day brought with it clear progress. Whatever wall had been there before was removed. Every day was a hackathon. Between working as an iOS developer full-time and working on WordIQ at home, I was soon quite literally even dreaming about code. Have you ever ran into a problem that you couldn't figure out, but when you woke up the next day, the answer magically came to you? That began happening almost every other day to me.

## Burnout

It wasn't long until I was tired almost every day because of not enough sleep. My days began to consist of work, WordIQ, some slight amount of sleep, and little else. A few weeks in, I began to feel the burnout. After proudly being the only person who didn't sleep a wink through several 24 hour hackathons that I attended, I hardly thought that *I* could burn out, but it turns out that everyone has limits.

The burnout is somewhat compounded when the remaining tasks at the end of a project tend to be the more tedious tasks that you've saved for the end, such as worrying about in-app purchasing logic, accounting for far-fetched edge cases, trying to make the correct sound effects, and fixing new bugs found during testing.

When I started the project, I was happily documenting every method and property that I wrote. I was documenting functions and methods that few people would ever look at, and more often than not, the documentation wasn't really needed as the parameter names tended to be sufficient descriptors.

![Overdocumentation](http://i.imgur.com/5hrwAqT.png)

Towards the end however, my code was getting increasingly sloppy and undocumented. More and more, it began to be a tedious chore as opposed to a labor of love. I wasn't happily losing sleep anymore as much as trying to get the game done so that I could go back to sleeping regularly again.

## Lessons Learned

It was a great feeling once the app was finally finished, though it took a few days over my initial 30. Along with the much needed relief of being able to go back to having a regular sleep schedule, it felt really good to finally finish somewhat of a bigger project.

Here are some lessons I learned about personal projects along the way.

* **You do have to do at least *some* planning.** I've started too many projects under the assumption that the idea for the app I'm trying to build will come to me as I build it. Drawing sketches and possible workflows *really* helps. It lets you think through how your app will actually function, which is a lot better in terms of stimulating thoughts than setting up the caching infrastructure.
* **When stuck, ask for help.** Even if you're not stuck, getting a second opinion from a trusted source is usually a pretty good idea. As engineers, we tend to think that we're brilliant and can do everything. Sadly, that is (usually) not the case. Asking for help and getting others' thoughts and opinions is paramount. I could not have finished this game without significant help.
* **Most importantly, *pace yourself*.** I had always cast aside this advice when I heard it before, but it *is* really important. I came pretty close on giving up on finishing the app due to burnout. You don't have to worry about deadlines with personal projects that you're working on in your free time. If you find that you're not just using up all of your free time, but also taking time away from other activities (such as sleeping or going to the gym), you're spending too much time on the project. You will inevitably run into delays and unforeseen issues.

## Conclusion

Making [WordIQ](http://itunes.apple.com/app/id1059196571) was a lot of fun and helped me learn a lot about not only iOS development, but also time and project management. Make sure to throw me a rating on the AppStore if you enjoy it - it really helps out! If you have any feedback, you can send it to [WordIQApp@gmail.com](mailto:wordiqapp@gmail.com)!

![WordIQ](http://i.imgur.com/afxlDZ0.png)