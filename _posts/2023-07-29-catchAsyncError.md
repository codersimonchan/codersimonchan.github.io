---
layout: post
title: An utility function that wraps async functions to handle errors
tags: [JS]
---
# Catch Async Error

## Handle errors with try...catch

In Node.js, you can use `try...catch` blocks to handle exceptions (errors) that might occur during the execution of your code. When using an async function, you'll notice that await only captures the value of a successful promise, making it unable to capture the failure results of the catch method execution. As a result, in async functions, we commonly employ the `try...catch` structure to handle errors. Whenever an error occurs within the try block, the code execution pauses, and the catch block captures the error. Hence, it's a common practice to combine async functions with `try...catch`.

## CatchAsync function

However, utilizing the `try...catch` structure within each individual async function can be cumbersome and lead to messy code structure. To address this, we can create a catchAsync function that wraps and captures errors for asynchronous functions. 

```
module.exports = fn => {       
    return (req, res, next)=>{ 
        fn(req, res, next).catch(next);  
    };
};
```
In above: catch(next)  === catch(err => next(err))
```
module.exports = fn => {       
    return (req, res, next)=>{ 
        fn(req, res, next).catch(err => next(err));  
    };
};
```

1.`module.exports`: This is a Node.js construct used to export functionality from a module. In this case, the module is exporting a function.

2.`(req, res, next) => { ... }`: This is an Express.js middleware function. It takes three arguments: req (request), res (response), and next (next is actually a function in the chain). It wraps the async function and handles any errors that may occur.

3.`fn(req, res, next)`: This line executes the original async function (fn) and passes the request, response, and next middleware function to it.

4.`.catch(err => next(err))`: This is where the error handling takes place. If the async function's promise rejects (throws an error), the .catch block captures the error (err) and passes it to the next middleware function,  it will trigger the error-handling middleware rather than proceeding to the next regular middleware in the chain. 

## Summary

In summary, the module.exports code defines a utility function that wraps async functions to handle errors and pass them to the next middleware. This can be used in an Express.js application to simplify error handling in asynchronous routes and middleware. To use this utility, you can require it in your code and apply it to your async route or middleware functions.
