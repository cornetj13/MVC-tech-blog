const express = require('express');
const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', (req, res) => {
  Post.findAll().then(posts => {
    console.log(posts);
    res.json(posts);
    res.render("home", {
      posts
    });
  });
});

module.exports = router;