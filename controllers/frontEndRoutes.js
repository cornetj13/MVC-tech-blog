const express = require('express');
const router = require('express').Router();
const { User, Post } = require('../models');

// Home route - shows all posts by ALL users, and allows a LOGGED IN USER to add a comment to a post.
router.get('/', (req, res) => {
  Post.findAll().then(posts => {
    const postsHbsData = posts.map(post => post.get({plain:true}))

    User.findByPk(req.session.user_id).then(foundUser => {
      let user_name;

      if(foundUser) {
        const hbsUser = foundUser.toJSON();
        user_name = hbsUser.username;
      } else {
        user_name = null;
      };

      res.render("home", {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        posts: postsHbsData,
        user_name: user_name
      });
    });
  });
});

// TODO: Individual post route - targets a single post and allows a LOGGED IN USER to leave a comment.



// Login render route.
router.get("/login", (req, res) => {
  // If logged in, redirect to dashboard.
  if(req.session.logged_in) {
    return res.redirect("/dashboard");
  };

  // Render login page.
  res.render("login", {
    logged_in: false,
    user_id: null
  });
});

// Sign-up render route.
router.get("/signup", (req, res) => {

  // If logged in, redirect to dashboard.
  if(req.session.logged_in) {
    return res.redirect("/dashboard");
  };

  // Render signup page.
  res.render("signup", {
    logged_in: false,
    user_id: null
  });
});

// TODO: Dashboard route - if logged in, shows all posts this user has created. Furthermore, allows users to update post.
router.get("/dashboard", (req, res) => {
  User.findByPk(req.session.user_id).then(foundUser => {
    let user_name;

    if(foundUser) {
      const hbsUser = foundUser.toJSON();
      user_name = hbsUser.username;
    } else {
      user_name = null;
    };

    res.render("dashboard", {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      user_name: user_name
    });
  });


});

// TODO: Update post route - if logged in, allows user to update the post they clicked on from the dashboard.

// 404 render for all other routes.
router.get("*", (req, res) => {
  res.render("notfound");
});

module.exports = router;