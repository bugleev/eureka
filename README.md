<div align="center">
<h1>Eureka Blogs</h1>
  <a href="https://eureka.bugleev.com/">
    <img width="300" heigth="300" src="https://github.com/bugleev/eureka/blob/master/public/img/eureka.JPG">
  </a>
  <br>
  <br>
  <p>
   Node js Blog Application
  </p>
</div>

<h2 align="center">Overview</h2>
This is a blog platform-type app, made in Node js for demonstration purposes.

## Stack

It runs fully in Nodejs, built using MVC pattern (model-view-controller). To store user data and posts i used MongoDB database (in pair with [Mongoose](https://github.com/Automattic/mongoose) tool). [Express](https://github.com/expressjs/express) was the main framework i used for application structure, also the [Passport](https://github.com/jaredhanson/passport) package - for handling user authentication (it's made very simple as the project is only a demo) and lots of other minor packages (e.g. "slug" for making URLs or "flash" for displaing flash info messages). As a front-end framework i chose Semantic UI, as it is rich of components and has nice default styles. 

## Features

* Users can:
   - Create an account and authenticate;
   - Create a blog, write posts;
   - See other blogs and recently written posts;
   - Comment posts;
   - Use "instant" search bar;
   - Manage posts and comments: edit and delete.


