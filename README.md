# CezaryWojcik.com

Personal website built with Node.js and Express.
It incorporates a Jekyll-like static markdown blog engine that caches the HTML result.
It also produces an RSS feed based on the posts at `/rss`.

## Requirements

- Node.js 18 or newer

## Setup

First, install dependencies:

```
npm install
```

Next, copy the example settings file:

```
cp settings.example.js settings.js
```

Then, using [your favorite editor](http://www.vim.org), edit the file and update the `authorEmail` and `port` values. Optionally configure `mailTransport` for the contact form (defaults to local sendmail).

Next, create a `posts` folder (already present in this repo):

```
mkdir -p posts
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
npm start
```

## Notes

- Templates use [Pug](https://pugjs.org) (formerly Jade).
- Compiled CSS lives in `public/css/style.css`; SCSS sources are under `public/css/scss/` if you need to rebuild styles.
