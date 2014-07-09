---
title: My New Website
excerpt: I decided that it was finally time to abandon the dark ages. Prior to a couple of days ago, my website was hosted on a shared hosting service and was built using PHP and MySQL. I built this new version from scratch using Node.js.
layout: generic
---

I decided that it was finally time to abandon the dark ages. Prior to a couple of days ago, my website was hosted on a shared hosting service and was built using PHP and MySQL. This PHP code is available [on my GitHub page](https://github.com/cezarywojcik/mywebsite).

I built this new website using [Node.js](http://nodejs.org) and several node packages. I used [Express 4](http://expressjs.com) (a web framework), [Jade](http://jade-lang.com) (a templating language), and [markdown.js](https://github.com/evilstreak/markdown-js) among others. I also used [SASS](http://sass-lang.com) to create my CSS. The full code is available [on my GitHub page](https://github.com/cezarywojcik/cwsite).

One of the biggest changes I made on a higher level is the way in which the posts for my blog are loaded. Previously, posts were stored in a MySQL database. My new website uses a [Jekyll](http://jekyllrb.com)-inspired model. I have a `posts/` folder that stores static markdown files. One of the nice things about Node is that I can use libraries like [highlight.js](http://highlightjs.org) to process the code server-side (the previous version of my website used [Google Code Prettify](https://code.google.com/p/google-code-prettify/), which had to be processed on the client side every time and could be a bit slow). The markdown now gets processed into HTML on the server and then the resulting HTML gets saved in a `cache/` folder. The site will load the already processed HTML unless the markdown file has a newer modification date.

I also updated the way my blog post URLs work to adapt a more modern standard. Previously, the URLs looked something like `/blog/XX`, where `XX` is the blog id number. These corresponded to the auto incrementing id in the MySQL database. However, now my blog posts will use the more modern and informative `/YYYY/MM/DD/some-title-here` standard instead. Just in case there are links that point to my previous `/blog/XX` schema, however, I implemented that as well. When that schema is used, the website will redirect the URL to the new date-based schema. This unfortunately still leaves behind some Disqus discussions that were tied to the previous URLs, but this is a change that I probably should have done eventually anyway.

For the most part, I tried to preserve the look of my previous version of the site. When I [rewrote my website last year](http://cezarywojcik.com/2013/07/15/my-new-website), I made some updates to the look and feel of my website, but for the most part, I still like the way the site looks. 

One of the first of small changes I made is removing the background pattern image. Previously, I used a subtle texture as the background of the website, but I changed to use a flat color instead. The change is barely noticeable, but the less images a website needs the better. Another small change is a small animation on the navigation menu items. Thanks to SASS, I was able to add animations fairly easily. I'm not quite sure whether I'm going to keep them yet, but I'm enjoying them for now.

Another minor change involving SASS is the gallery page. One of my goals for this website was to have no JavaScript (excluding Disqus and Google Analytics). I implemented [my gallery page](/gallery) using only CSS3 animations, whereas my previous version of the website used a JavaScript library for a similar kind of interaction. Another change involving the gallery is that much like the blog posts, the gallery is created based on a list of static files. One of the issues I had with my previous website is that updating the gallery page was tedious, so I addressed that issue.

I now also have a list of the three most recent blog posts on the front page as opposed to just one.

There are other smaller and far more subtle changes and improvements as well, some of which are more convenience measures for myself. Setting things up with my own VPS from scratch has been far more rewarding than using a limited shared host. It is nice to have full control of my server.

This implementation is not quite yet complete - there are still some things that I want to get taken care of before I call everything good and done, but most of these are mainly busy work. I'm mainly just []happy that I don't have to use PHP](http://eev.ee/blog/2012/04/09/php-a-fractal-of-bad-design/) anymore.