---
layout: post
title: How to debug NodeJS
tags: [JS]
---

## Default debugging process

The default debugging process of NodeJS (read Node.js) is quite clumsy. You are likely already aware of the need to add `--inspect` to the node script with node inspector. It is also dependent on Chrome. Then you have to look at the proper web socket connection which is hard, and debug using Chrome’s node debugger. To be honest, it is a pain in the neck.

Finally, Google chrome labs has released ndb, which they say is “An improved debugging experience for Node.js, enabled by Chrome DevTools”. Ndb is a boon when debugging a Nodejs app.

### 1. Getting started, install ndb

Installing ndb is very easy. All you need to do to get started debugging your nodejs application is to install [ndb](https://github.com/GoogleChromeLabs/ndb#installation). I would suggest that you install it globally with:

```
npm i ndb –save-dev
```

You can also install and use it locally per app if you want. One thing I had to fix was to get the latest version of Chrome, as I saw some permission issues.

### 2. Run the app with ndb (not node or nodemon)

For debugging nodejs applications with ndb, you can directly run the nodejs app script with ndb rather than node. For example, if you were used to doing `node index.js` or `nodemon index.js` in development. To debug your app you can run:

```
"scripts": {
  "debug": "ndb app.js"
},
```

```
ndb app.js
```

Notice that you don’t need to put any `-- inspect` so the experience is a lot smoother. You don’t need to remember a different port or go to chrome devtools and open up a different inspector window to debug. Such a relief!

ndb opens up a screen like below when you do `ndb .` or `ndb index.js`
![eventloop](/images/posts/jekyll/breakpoint.png)

Please add a breakpoint on line 46. As you have run the application with ndb it will run in debug mode and stop at the breakpoint like below when you hit `http://localhost:8080/api/convert/USD/AUD/2019-01-01` on the browser.

ndb allows you to run any script for debugging. For example, I can run `ndb npm start` and it will use the nodemon run. This means I can debug the application while changing the code which is great.

As an example it can be run with `ndb npm start` to debug this NodeJS express application.

### 3. Let’s debug some code

### Reference

https://www.freecodecamp.org/news/how-to-get-started-debugging-nodejs-applications-with-ndb-a37e8747dbba/