const express = require('express');
const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');
const {validateUser} = require('../middleware.js');
const {validatePost} = require('../middleware.js');
const {validateUserID} = require('../middleware.js');


const router = express.Router();

router.post('/', validateUser, async (req, res, next) => {
  const user = await Users.insert(req.body)
  res.status(200).json(user);
});

router.post('/:id/posts', validateUserID, validatePost, async (req, res) => {
  try {
    const newPost = await
    Posts.insert(req.body);
    if (newPost) {
      res.status(201).json(newPost);
    } else {
      res.status(400).json({
        message: 'Missing Data'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something Broke'
    });
  }
});

router.get('/', async (req, res, next) => {
  try{
    const users = await Users.get();
    if(users.length) {
      res.status(200).json(users);
    } else {
      res.status(404).json({
        message: "No users avaiable" });
      }
    } catch(error) {
        next(error)
    }
});

router.get('/:id', validateUserID, async (req, res, next) => {
  const user = await Users.getById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    console.log(error);
    res.status(500).json({
      error: "User information could not be retreived"
    });
  }
});

router.get('/:id/posts', validateUserID, async (req, res, next) => {
  // do your magic!
  const userPosts = await Users.getUserPosts(req.params.id);
  if (userPosts) {
    res.status(200).json(userPosts);
  } else {
    console.log(error);
    res.status(500).json({
      error: "User's Posts information could not be retreived"
    });
  }
});

router.delete('/:id', validateUserID, async (req, res, next) => {
  const user = await Users.remove(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    console.log(error);
    res.status(500).json({
      error: "User could not be deleted"
    });
  }
});

router.put('/:id', validateUserID, async (req, res, next) => {
  const user = await Users.update(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    console.log(error);
    res.status(500).json({
      error: "User could not be updated"
    });
  }
});

//custom middleware

module.exports = router;
