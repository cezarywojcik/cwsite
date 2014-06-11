# CezaryWojcik.com

This is a new version of my website that is built using Node.js.
It incorporates a Jekyll-like static markdown blog engine that caches the HTML result.
It also produces an RSS feed based on the posts at `/rss`.

## Setup

First, in the terminal:

```
cp settings.example.js settings.js
```

Then, using [your favorite editor](http://www.vim.org), edit the file and update the `authorEmail` and `port` values.

Next, create a `posts` folder:

```
mkdir posts
```

Create blog posts in this folder.

Posts must be named in the format `YYYY-MM-DD-some-title-here.md` as in [Jekyll](http://jekyllrb.com). Also as in Jekyll, the top of the file should have the following [YAML](http://www.yaml.org):

```
---
title: Some Title Here
layout: generic
excerpt: Some excerpt or preview from the blog post
---

Actual **Markdown** post goes here...
```

To start the site:

```
node app.js
```
